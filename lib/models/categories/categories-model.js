'use strict';

const schema = require('./categories-schema.js');
const Model = require('../mongo.js');

/**
 * class that extends Model to wrap categories shcema with CRUD operations
 */
class Categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Categories();