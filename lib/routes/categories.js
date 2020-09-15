'use strict';

const express = require('express');
const router = express.Router();
const categories = require('../models/categories/categories-model.js');

//------------- Routes -----------

// add category
router.post('/categories', addCategory);

// get all categories
router.get('/categories', getAllCategories);

//get category by ID
router.get('/categories/:id', getCategoryById);

//update category by id
router.put('/categories/:id', updateCategoryById);

//delete category by id
router.delete('/categories/:id', deleteCategoryById);

//------------- Handlers -----------

async function addCategory(req, res) {
  let category = req.body;

  try {
    let categoryRet = await categories.create(category);
    res.status(200).send(categoryRet);
  } catch (err) {
    console.log(err);
  }
}

async function getAllCategories(req, res) {
  try {
    let categoriesRet = await categories.get();
    let response = {
      count: categoriesRet.length,
      results: categoriesRet,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
}

async function getCategoryById(req, res) {
  let id = req.params.id;
  try {
    let category = await categories.get(id);
    res.status(200).json(category[0]);
  } catch (err) {
    console.log(err);
  }
  
}

async function updateCategoryById(req, res) {
  let id = req.params.id;
  let updateCategory = req.body;

  try {
    await categories.update(id, updateCategory);
    let categoriesUpdated = await categories.get(id);
    res.status(200).json(categoriesUpdated[0]);
  } catch (err) {
    console.log(err);
  }
}

async function deleteCategoryById(req, res) {
  let id = req.params.id;

  try {
    let categoriesDel = await categories.delete(id);
    res.status(200).json(categoriesDel);
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
