//*********DEPENDENCIES
require("dotenv").config() //loads .env variables
const express = require("express") //web framework
const morgan = require("morgan") //logger
const methodOverride = require("method-override") //overriding forms
const mongoose = require("mongoose") //connect to mongoDB


//********DATABASE CONNECTION
//db connection string
const DATABASE_URL = process.env.DATABASE_URL

//establish a connection
mongoose.connect(DATABASE_URL)

//events for when connection changes
mongoose.connection
.on("open", () => console.log("Mongo connected"))
.on("closed", () => console.log("Mongo disconnected"))
.on("error", (error) => console.log(error))


//********FRUITS MODEL
//destructure Schema and model into their own variables
const {Schema, model} = mongoose

//Schema - shape
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

//Model - object for interacting with the db
const Fruit = model("Fruit", fruitSchema)

//********EXPRESS APP OBJECT
const app = express()


//********MIDDLEWARE
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


//********ROUTES
app.get("/", (req, res) => {
    res.send("your server is running ... better go catch it")
})


//********SERVER LISTENER
const PORT = process.env.PORT || 1313
app.listen(PORT, () => {
    console.log(`I hear ya on port ${PORT}`)
})
