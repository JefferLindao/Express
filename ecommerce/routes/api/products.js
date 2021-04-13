const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product');

const productSrv = new ProductService();
router.get('/', async function (req, res, next) {
  const { tags } = req.query;

  try {
    const products = await productSrv.getProducts({ tags });
    res.status(200).json({
      data: products,
      message: 'products listed'
    })
  } catch (error) {
    next(error)
  }
});

router.get('/:productId', async function (req, res, next) {
  const { productId } = req.params;
  try {
    const product = await productSrv.getProduct({ productId });
    res.status(200).json({
      data: product,
      message: 'product retrieved'
    })
  } catch (error) {
    next(err)
  }
});

router.post('/', async function (req, res, next) {
  const { body: product } = req;
  try {
    const createProduct = await productSrv.createProducts({ product });
    res.status(201).json({
      data: createProduct,
      message: 'products created'
    })
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', async function (req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;
  try {
    const updateProduct = await productSrv.updateProducts({ productId, product });
    res.status(200).json({
      data: updateProduct,
      message: 'product updated'
    })
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async function (req, res, next) {
  const { productId } = req.params;
  try {
    const deleteProduct = await productSrv.deleteProducts({ productId });
    res.status(200).json({
      data: deleteProduct,
      message: 'product deleted'
    })
  } catch (error) {
    next(error);
  }
});
module.exports = router;
