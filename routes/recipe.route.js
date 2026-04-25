const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const auth = require('../middlewares/auth');

router.get('/time/:minutes', recipeController.getRecipesByTime);
router.get('/user/:userId', auth, recipeController.getRecipesByUser); 

// 2. נתיבים כלליים של קריאה
router.get('/', auth, recipeController.getAllRecipes); 
router.get('/:id', recipeController.getRecipeById);

// 3. נתיבים שמשנים נתונים - חייבים auth!
router.post('/', auth, recipeController.addRecipe); 
router.put('/:id', auth, recipeController.updateRecipe);
router.delete('/:id', auth, recipeController.deleteRecipe);

module.exports = router;