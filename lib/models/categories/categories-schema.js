'use strict';

const mongoose = require('mongoose');

/**
 * Categories schema
 */
const categories = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('categories', categories);
