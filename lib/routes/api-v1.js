'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('../middleware/model-finder.js');


router.param('model', modelFinder.getModel);

//------------- Routes -----------

// add
router.post('/:model', handelPost);

// get all
router.get('/:model', handelGetALL);

//get by ID
router.get('/:model/:id', handelGetOne);

//update  by id
router.put('/:model/:id', handelUpdate);

//update  partially by id
router.patch('/:model/:id', handelUpdate);

//delete  by id
router.delete('/:model/:id', handelDelete);

//------------- Handlers -----------

/**
 * handeling the user post request
 * @param {object} req 
 * @param {object} res 
 */
async function handelPost(req, res) {
  let model = req.body;
  try {
    let modelRet = await req.model.create(model);
    res.status(200).json(modelRet);
  } catch (err) {
    console.log(err);
  }
}

/**
 * handeling the user get request for all records
 * @param {object} req 
 * @param {object} res 
 */
async function handelGetALL(req, res) {
  try {
    let modelRet = await req.model.get();
    let response = {
      count: modelRet.length,
      results: modelRet,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
}
  
/**
 * handeling the user get request for one record
 * @param {object} req 
 * @param {object} res 
 */
async function handelGetOne(req, res) {
  let id = req.params.id;
  try {
    let product = await req.model.get(id);
    res.status(200).json(product[0]);
  } catch (err) {
    console.log(err);
  }
}
  
/**
 * handeling the user update request
 * @param {object} req 
 * @param {object} res 
 */
async function handelUpdate(req, res) {
  let id = req.params.id;
  let updateModel = req.body;
  try {
    await req.model.update(id, updateModel);
    let modelUpdated = await req.model.get(id);
    res.status(200).json(modelUpdated[0]);
  } catch (err) {
    console.log(err);
  }
}
 
/**
 * handeling the user delete request
 * @param {object} req 
 * @param {object} res 
 */
async function handelDelete(req, res) {
  let id = req.params.id;
  try {
    let modelDel = await req.model.delete(id);
    res.status(200).json(modelDel);
  } catch (err) {
    console.log(err);
  }
}


module.exports = router;
