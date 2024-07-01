const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Menu Item schema
const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  category: { type: String, enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'], required: true },
  ingredients: [String], // Array of ingredients
  vegetarian: { type: Boolean, default: false },
  spicy: { type: Boolean, default: false },
  image: { type: String }, // URL or path to the image
  available: { type: Boolean, default: true }
});

// Create a model for the Menu Item schema
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
