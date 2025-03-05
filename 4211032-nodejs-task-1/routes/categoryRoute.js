const express = require('express');
const { getCategories, getCategorybyID,createCategories, updateCategoryByID,deleteCategoryByID} = require('../Services/categoryService');

const router = express.Router();

router.route('/').get(getCategories).post(createCategories);
router.route('/:id').get(getCategorybyID).put(updateCategoryByID).delete(deleteCategoryByID);

module.exports = router;