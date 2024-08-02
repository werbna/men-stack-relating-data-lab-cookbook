const express = require('express')
const router = express.Router()

const User = require('../models/user.js')
const Recipe = require('../models/recipe.js')

router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render('ingredients/index', { ingredients });
  } catch (err) {
    res.status(500).send('Error retrieving ingredients');
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const ingredient = new Ingredient({ name });
    await ingredient.save();
    res.redirect('/ingredients');
  } catch (err) {
    res.status(500).send('Error creating ingredient');
  }
});

module.exports = router;