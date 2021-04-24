const assert = require('assert');
const proxyquire = require('proxyquire');

const { mocksProducts, ProductsServiceMock } = require('../util/mocks/products');

const testServer = require('../util/testServer');

describe("routes - api - products", function () {
  const route = proxyquire('../routes/api/products', {
    "../../services/product": ProductsServiceMock
  })
  const request = testServer(route);
  describe("GET /products", function () {
    it("should respond with status 200", function (done) {
      request.get('/api/products').expect(200, done);
    })

    it("should respond with content type json", function (done) {
      request.get('/api/products').expect("Content-type", /json/, done);
    })

    it("should respond with not error", function (done) {
      request.get('/api/products').end((err, res) => {
        assert.strictEqual(err, null);
        done();
      })
    })

    it("should respond with list of products", function (done) {
      request.get('/api/products').end((err, res) => {
        assert.deepEqual(res.body, {
          data: mocksProducts,
          message: "products listed"
        })
        done();
      })
    })
  })
})
