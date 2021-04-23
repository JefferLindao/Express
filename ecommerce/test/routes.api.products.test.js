const assert = require('assert');
const proxyquire = require('proxyquire');

const { productsMock, ProductsServiceMock } = require('../util/mocks/products');

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
  })
})
