//DEPENDENCIES
require("dotenv").config()
const mongoose = require("mongoose")

//CONNECTION
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open", () => {console.log("Mongo connected")})
.on("close", () => {console.log("Mongo disconnected")})
.on("error", (error) => {console.log(error)})

//EXPORT CONNECTION
module.exports = mongoose //this version of mongoose is connected, the one up top isn't
