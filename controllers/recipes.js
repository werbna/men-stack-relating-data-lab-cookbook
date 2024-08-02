const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Recipe = require("../models/recipe.js");

//ALL routes should start with /recipe/

// GET index
router.get("/", (req, res) => {
  try {
    res.render("recipes/index.ejs");
  } catch (error) {
    console.log(error);
  }
});

router.get("/new", (req, res) => {
  try {
    res.render("recipes/new.ejs");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id
    newRecipe.ingredients = objectId
    await newRecipe.save();
    res.redirect('/recipes')
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
