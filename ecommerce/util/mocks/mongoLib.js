const { mocksProducts, filteredProductsMock } = require('./products');
const sinon = require('sinon');

const getAllStub = sinon.stub();
const tagsQuery = { tags: { $in: ["expensive"] } };

getAllStub.withArgs("products").resolves(mocksProducts);
getAllStub.withArgs('products', tagsQuery).resolves(filteredProductsMock('expensive'));
const createStub = sinon.stub().resolves('6bedb1267d1ca7f3053e2875');
class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
}
