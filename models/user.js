//DEPENDENCIES
const mongoose = require("./connection.js")

//DEFINE MODEL

const {Schema, model} = mongoose

//make schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//make user model
const User = model("User", userSchema)

//EXPORT
module.exports = User