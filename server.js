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
//Root
app.get("/", (req, res) => {
    res.send("your server is running ... better go catch it")
})

//Seed route
app.get("/fruits/seed", async (req, res) => {
    try {
        const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
        ]

        //reset from scratch
        await Fruit.deleteMany({})

        //seed starter fruits
        const fruits = await Fruit.create(startFruits)
        
        //send fruits as response
        res.json(fruits)
    } catch(error){
        console.log(error)
        res.send("there was an error, read logs for details")
    } 
})

//Index
app.get("/fruits", async (req, res) => {
    try{
        const fruits = await Fruit.find({})
        res.render("fruits/index.ejs", {fruits})
    } catch(error){
        console.log("------------", error.message)
        res.status(400).send("error, read logs for details")
    }
})



//********SERVER LISTENER
const PORT = process.env.PORT || 1313
app.listen(PORT, () => {
    console.log(`I hear ya on port ${PORT}`)
})
