'use strict';

const schema = require('./todo-schema.js');
const Model = require('../mongo.js');

/**
 * class that extends Model to wrap categories shcema with CRUD operations
 */
class ToDo extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new ToDo();