const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Recipe = require('../models/recipe.js')
const Ingredient = require('../models/ingredient.js')

router.get ('/', async (req,res) => {
  try{
    const ingredients = await Ingredient.find({}).populate()
    res.render('ingredients/index.ejs', { ingredients })
  } catch (error) {
    console.log(error)
  }
})

router.get ('/new', (req,res) => {
  try {
    res.render('ingredients/new.ejs')
  } catch (error) {
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.redirect('/ingredients')
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;