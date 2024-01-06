//DEPENDENCIES
const mongoose = require("./connection.js");

//DEFINE FRUIT MODEL
//destructure Schema and model into their own variables
const { Schema, model } = mongoose;

//Schema - shape
const fruitSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
  username: String,
});

//Model - object for interacting with the db
const Fruit = model("Fruit", fruitSchema);

//EXPORT
module.exports = Fruit;
