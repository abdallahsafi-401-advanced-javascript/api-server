'use strict';

const express = require('express');
const router = express.Router();
const products = require('../models/products/products-model.js');

//------------- Routes -----------

// add product
router.post('/products', addProduct);

// get all products
router.get('/products', getAllProducts);

//get product by ID
router.get('/products/:id', getProductById);

//update product by id
router.put('/products/:id', updateProductById);

//update product partially by id
router.patch('/products/:id', updateProductById);


//delete product by id
router.delete('/products/:id', deleteProductById);

//------------- Handlers -----------

async function addProduct(req, res) {
  let product = req.body;
  try {
    let productRet = await products.create(product);
    res.status(200).json(productRet);
  } catch (err) {
    console.log(err);
  }
}

async function getAllProducts(req, res) {
  try {
    let productsRet = await products.get();
    let response = {
      count: productsRet.length,
      results: productsRet,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
}

async function getProductById(req, res) {
  let id = req.params.id;
  try {
    let product = await products.get(id);
    res.status(200).json(product[0]);
  } catch (err) {
    console.log(err);
  }
}

async function updateProductById(req, res) {
  let id = req.params.id;
  let updateProduct = req.body;
  try {
    await products.update(id, updateProduct);
    let productUpdated = await products.get(id);
    res.status(200).json(productUpdated[0]);
  } catch (err) {
    console.log(err);
  }
}

async function deleteProductById(req, res) {
  let id = req.params.id;
  try {
    let productDel = await products.delete(id);
    res.status(200).json(productDel);
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
