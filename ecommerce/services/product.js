const productsMocks = require('../util/mocks/products');

class ProductsService {
  constructor() {

  }

  getProducts({ tags }) {
    return Promise.resolve(productsMocks[0])
  }

  getProduct({ productId }) {
    return Promise.resolve(productsMocks[0])
  }

  createProducts({ product }) {
    return Promise.resolve(productsMocks[0])
  }

  updateProducts({ productId, product }) {
    return Promise.resolve(productsMocks[0])
  }

  deleteProducts({ productId }) {
    return Promise.resolve(productsMocks[0])
  }
}

module.exports = ProductsService;

