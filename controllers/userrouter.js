//DEPENDENCIES
const express = require("express")
const User = require("../models/user.js")
const bcrypt = require("bcryptjs")

//ROUTER
const router = express.Router()

//ROUTES
// Signup Page Route (get -> /user/signup -> form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

// Signup Submit Route (post -> /user/signup -> create the user)
router.post("/signup", async (req, res) => {
    res.send("signup")
})

// Login page Route (get -> /user/login -> form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

// Login submit route (post -> /user/login -> login the user)
router.post("/login", async (req, res) => {
    res.send("login")
})

// Logout Route (??? -> destroy the session)
router.get("/logout", async (req, res) => {
    res.send("logout")
})


//Export
module.exports = router