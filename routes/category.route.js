const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// שליפת כל הקטגוריות בלבד
router.get('/', categoryController.getAllCategories);

// שליפת הכל כולל המתכונים (שימי לב לנתיב השונה כדי שלא תהיה התנגשות)
router.get('/all/recipes', categoryController.getCategoriesWithRecipes);

// שליפה לפי שם או קוד
router.get('/:idOrName', categoryController.getCategoryDetails);

module.exports = router;