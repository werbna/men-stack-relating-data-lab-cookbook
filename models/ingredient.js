const mongoose = require('mongoose');

const IngredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
})

const Ingredient = mongoose.model('Ingredient', IngredientSchema)
module.exports = Ingredient