const express = require('express');
const { config } = require('../config');
const router = express.Router();
const ProductSrv = require('../services/product');
const cacheResponse = require('../util/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../util/time');
const productSrv = new ProductSrv();

router.get('/', async function (req, res, next) {
  const { tags } = req.query;

  try {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
    const products = await productSrv.getProducts({ tags })
    res.render("products", { products, dev: config.dev });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
