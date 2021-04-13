const productsMocks = require('../util/mocks/products');
const MongoLib = require('../lib/mongo');

class ProductsService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProducts({ product }) {
    const createProduct = await this.mongoDB.create(this.collection, product);
    return createProduct;
  }

  async updateProducts({ productId, product }) {
    const updateProduct = await this.mongoDB.update(this.collection, productId, product);
    return updateProduct;
  }

  async deleteProducts({ productId }) {
    const deleteProduct = await this.mongoDB.delete(this.collection, productId);
    return deleteProduct
  }
}

module.exports = ProductsService;

