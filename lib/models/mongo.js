'use strict';

class Model {

  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    let id = _id ? { _id } : {};
    return this.schema.find(id);
  }

  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record);
  }

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
