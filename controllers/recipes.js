const express = require("express");
const router = express.Router();
const Ingredient = require('../models/ingredient.js')
const User = require("../models/user.js");
const Recipe = require("../models/recipe.js");

//ALL routes should start with /recipe/

// GET index
router.get("/", async (req, res) => {
  try {
    const userId = req.session.user._id
    const recipes = await Recipe.find({ owner: userId})
    const allRecipes = await Recipe.find({}).populate('owner')
    res.render("recipes/index.ejs", { recipes,allRecipes});
  } catch (error) {
    console.log(error);
  }
});

router.get("/new",async(req, res) => { 
  try {
    const ingredients = await Ingredient.find({})
    res.render('recipes/new.ejs', { ingredients });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const newRecipe = new Recipe(req.body);
    
    newRecipe.owner = req.session.user._id;
    await newRecipe.save();
    res.redirect('/recipes')
  } catch (error) {
    console.log(error);
  }
});

router.get('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate('owner').populate('ingredients')
    res.render('recipes/show.ejs', { recipe } )
  } catch (error) {
    console.log(error)
  }
})

router.get('/:recipeId/edit', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({})
    const recipe = await Recipe.findById(req.params.recipeId).populate('owner');
    res.render('recipes/edit.ejs', { recipe });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:recipeId', async (req, res) => {
  try {
    const currentRecipe = await Recipe.findById(req.params.recipeId);
    const ingredients = await Ingredient.find({})
    if (currentRecipe.owner.equals(req.session.user._id)) {
      await currentRecipe.updateOne(req.body);
      res.redirect('/recipes');
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:recipeId/', async (req,res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    if (recipe.owner.equals(req.session.user._id)) {
    await recipe.deleteOne();
    res.redirect('/recipes');
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.log(error)
    res.redirect('/recipes');
  }
})

module.exports = router;

