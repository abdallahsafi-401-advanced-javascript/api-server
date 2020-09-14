'use strict';

const express = require('express');
const app = express();
require('dotenv').config('.env');
const cors = require('cors');

// ------------  middleware ------------
const logger = require('./middleware/logger.js');
const timestamp = require('./middleware/timestamp.js');
const status404 = require('./middleware/404.js');
const status500 = require('./middleware/500.js');

// Global MiddleWare
app.use(express.json());
app.use(timestamp);
app.use(logger);
app.use(cors());

// route middleware
// --------------- PRODUCTS ---------------
let products = [];
// add product
app.post('/products', (req, res) => {
  let product = req.body;
  product.id = toString( products.length + 1);
  products.push(product);
  res.status(200).send(product);
});

// get all products
app.get('/products', (req, res) => {
  let response = {
    count: products.length,
    results: products,
  };
  res.status(200).send(response);
});

//get product by ID
app.get('/products/:id', (req, res) => {
  let id = req.params.id;
  let response = products.find((e) => {
    return e.id === id;
  });
  res.status(200).json(response);
});

//update product by id
app.put('/products/:id', (req, res) => {
  let id = req.params.id;
  let updateProduct = req.body;
  let index = products.findIndex((e) => {
    return e.id === id;
  });
  products[index] = updateProduct;
  res.status(200).json(products[index]);
});

//delete product by id
app.delete('/products/:id', (req, res) => {
  let id = req.params.id;
  //find index of the product
  let index = products.findIndex((e) => {
    return e.id === id;
  });
  //remove the product
  products.splice(index, 1);
  //trying to find it again to make sure it is removed
  let response = products.find((e) => {
    return e.id === id;
  });
  res.status(200).json(response);
});

// --------------- CATEGORIES ---------------
let categories = [];

// add category
app.post('/categories', (req, res) => {
  let category = req.body;
  category.id = String(categories.length + 1);
  categories.push(category);
  res.status(200).send(category);
});

// get all categories
app.get('/categories', (req, res) => {
  let response = {
    count: categories.length,
    results: categories,
  };
  res.status(200).send(response);
});

//get category by ID
app.get('/categories/:id', (req, res) => {
  let id = req.params.id;
  let response = categories.find((e) => {
    return e.id === id;
  });
  res.status(200).json(response);
});

//update category by id
app.put('/categories/:id', (req, res) => {
  let id = req.params.id;
  let updateCategory = req.body;
  let index = categories.findIndex((e) => {
    return e.id === id;
  });
  categories[index] = updateCategory;
  res.status(200).json(categories[index]);
});

//delete category by id
app.delete('/categories/:id', (req, res) => {
  let id = req.params.id;
  //find index of the category
  let index = categories.findIndex((e) => {
    return e.id === id;
  });
  //remove the category
  categories.splice(index, 1);
  //trying to find it again to make sure it is removed
  let response = categories.find((e) => {
    return e.id === id;
  });
  res.status(200).json(response);
});

// ---------------------------

//test the server error
app.get('/bad', (req, res) => {
  throw new Error('bad Request');
});

// 404 page not found
app.use('*', status404);
// server error
app.use(status500);

module.exports = {
  server: app,
  start: (port) => {
    let PORT = port || process.env.port || 3000;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  },
};
