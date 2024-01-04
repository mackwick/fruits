//DEPENDENCIES
const express = require("express")
const Fruit = require("../models/Fruit")

//CREATE ROUTER
const router = express.Router()

//ROUTES

//Index route
router.get("/", async (req, res) => {
    try{
        const fruits = await Fruit.find({})
        res.render("fruits/index.ejs", {fruits})
    } catch(error){
        console.log("------------", error.message)
        res.status(400).send("error, read logs for details")
    }
})

//New route
router.get("/new", (req, res) => {
    res.render("fruits/new.ejs")
})

//Destroy route
router.delete("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) =>{
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
router.post("/", async (req, res) => {
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
router.get("/:id/edit", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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


//EXPORT ROUTER
module.exports = router