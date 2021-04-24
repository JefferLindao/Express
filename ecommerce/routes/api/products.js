const express = require('express');
const passport = require('passport');
const ProductService = require('../../services/product');
const cacheResponse = require('../../util/cacheResponse');
const validation = require('../../util/middlewares/validationHandler');
const { createProductSchema, updateProductSchema, productIdSchema } = require('../../util/schemas/products');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../util/time');

//Estrategia
require('../../util/auth/strategies/jwt');

function productsApi(app) {
  const router = express.Router();
  app.use("/api/products", router);

  const productSrv = new ProductService();
  router.get('/', async function (req, res, next) {
    const { tags } = req.query;

    try {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
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
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
      const product = await productSrv.getProduct({ productId });
      res.status(200).json({
        data: product,
        message: 'product retrieved'
      })
    } catch (error) {
      next(err)
    }
  });

  router.post('/', validation(createProductSchema), async function (req, res, next) {
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

  router.put('/:productId',
    passport.authenticate('jwt', { session: false }),
    validation(productIdSchema, "req.params"),
    validation(updateProductSchema),
    async function (req, res, next) {
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

  router.delete('/:productId',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
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
}


module.exports = productsApi;
