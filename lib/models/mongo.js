'use strict';

/**
 * class to set define and performe CRUD operation 
 */
class Model {

  constructor(schema) {
    this.schema = schema;
  }

  /**
   * get the records
   * @param {string} [_id]
   */
  get(_id) {
    let id = _id ? { _id } : {};
    return this.schema.find(id);
  }

  /**
   * create new record
   * @param {object} record 
   */
  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
   * update an existing record
   * @param {string} _id 
   * @param {object} record 
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record);
  }

  /**
   * delete an existing record
   * @param {string} _id 
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
