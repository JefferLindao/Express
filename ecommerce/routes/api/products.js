const express = require('express');
const router = express.Router();
const productMock = require('../../util/mocks/products');

router.get('/', function (req, res) {
  const { query } = req.query;
  res.status(200).json({
    data: productMock,
    message: 'products listed'
  })
})

router.get('/:productId', function (req, res) {
  const { productId } = req.params;
  res.status(200).json({
    data: productMock[0],
    message: 'product retrieved'
  })
})

router.post('/', function (req, res) {
  //const { productId } = req.params;
  res.status(201).json({
    data: productMock[0],
    message: 'products listed'
  })
})

router.put('/:productId', function (req, res) {
  //const { productId } = req.params;
  res.status(200).json({
    data: productMock[0],
    message: 'product updated'
  })
})

router.delete('/:productId', function (req, res) {
  //const { productId } = req.params;
  res.status(200).json({
    data: productMock[0],
    message: 'product deleted'
  })
})
module.exports = router;
