'use strict';

const categories = require('../models/categories/categories-model.js');
const products = require('../models/products/products-model.js');
const todo = require('../models/todo/todo-model.js');


/**
 * Callback for adding controll to the next middlware.
 *
 * @callback next
 * @param {*} [error] - An integer.
 */

/**
 * this function will get the request params and determine which model that
 * the user requested
 * @param {object} req 
 * @param {object} res 
 * @param {next} callback - A callback to run.
 */

function getModel(req, res, next) {
  let model = req.params.model;
  switch (model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  case 'todo':
    req.model = todo;
    next();
    return;
  default:
    next('Invalid Model');
    return;
  }
}

module.exports.getModel = getModel;
