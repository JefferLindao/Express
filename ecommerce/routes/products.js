const express = require('express');
const { config } = require('../config');
const router = express.Router();
const ProductSrv = require('../services/product');
const productSrv = new ProductSrv();

router.get('/', async function (req, res, next) {
  const { tags } = req.query;

  try {
    //throw new Error('This is an error');
    const products = await productSrv.getProducts({ tags })
    res.render("products", { products, dev: config.dev });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
