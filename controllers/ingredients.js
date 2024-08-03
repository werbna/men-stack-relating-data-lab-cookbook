const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const Recipe = require('../models/recipe.js')

router.get("/", async (req, res) => {
  try {
    const userId = req.session.user._id
    const recipes = await Recipe.find({ owner: userId})
    res.render("recipes/index.ejs", { recipes} );
  } catch (error) {
    console.log(error);
  }
});

router.get("/new", (req, res) => { 
  try {
    res.render('recipes/new.ejs');
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const newIngredient = new Ingredient(req.body);
    newIngredient.owner = req.session.user._id;
    await newIngredient.save();
    res.redirect('/recipes')
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;