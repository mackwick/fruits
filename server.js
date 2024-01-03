//*********DEPENDENCIES
require("dotenv").config() //loads .env variables
const express = require("express") //web framework
const morgan = require("morgan") //logger
const methodOverride = require("method-override") //overriding forms
const mongoose = require("mongoose") //connect to mongoDB
const Fruit = require("./models/Fruit.js")


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

//Index route
app.get("/fruits", async (req, res) => {
    try{
        const fruits = await Fruit.find({})
        res.render("fruits/index.ejs", {fruits})
    } catch(error){
        console.log("------------", error.message)
        res.status(400).send("error, read logs for details")
    }
})

//New route
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})

//Destroy route
app.delete("/fruits/:id", async (req, res) => {
    try{
        const id = req.params.id
        await Fruit.findByIdAndDelete(id)
        res.redirect("/fruits")
    } catch(error) {
        console.log("------------", error.message)
        res.status(400).send("error, read logs for details")
    }
})

//Update route
app.put("/fruits/:id", async (req, res) =>{
    try{
        const id = req.params.id
        //update ready to eat
        req.body.readyToEat = req.body.readyToEat === "on" ? true : false
        //update the fruit
        await Fruit.findByIdAndUpdate(id, req.body)
        res.redirect(`/fruits/${id}`)
    }catch(error) {
        console.log("------------", error.message)
        res.status(400).send("error, read logs for details")
    }
})

//Create route
app.post("/fruits", async (req, res) => {
    try{
        //check if readyToEat should be true
        req.body.readyToEat = req.body.readyToEat === "on" ? true : false
        //create fruit
        await Fruit.create(req.body)
        //redirect to main 
        res.redirect("/fruits")
    }catch(error) {
        console.log("------------", error.message)
        res.status(400).send("error, read logs for details")
    }
})

//Edit route
app.get("/fruits/:id/edit", async (req, res) => {
    try{
        const id = req.params.id
        const fruit = await Fruit.findById(id)
        await res.render("fruits/edit.ejs", {fruit})
    } catch(error) {
        console.log("------------", error.message)
        res.status(400).send("error, read logs for details")
    }
})

//Show route
app.get("/fruits/:id", async (req, res) => {
    try{
        const id = req.params.id
        const fruit = await Fruit.findById(id)
        //render template
        res.render("fruits/show.ejs", {fruit})
    }catch(error) {
        console.log("------------", error.message)
        res.status(400).send("error, read logs for details")
    }
})


//********SERVER LISTENER
const PORT = process.env.PORT || 1313
app.listen(PORT, () => {
    console.log(`I hear ya on port ${PORT}`)
})
