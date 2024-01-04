//*********DEPENDENCIES
require("dotenv").config() //loads .env variables
const express = require("express") //web framework
const morgan = require("morgan") //logger
const methodOverride = require("method-override") //overriding forms
const fruitController = require("./controllers/fruitrouter.js")
const userController = require("./controllers/userrouter.js")

//********EXPRESS APP OBJECT
const app = express()

//********MIDDLEWARE
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("/fruits", fruitController) //anytime a url request starts with /fruits, send it to the fruitController
app.use("/user", userController)

//********ROUTES
//Root
app.get("/", (req, res) => {
    res.send("your server is running ... better go catch it")
})

//********SERVER LISTENER
const PORT = process.env.PORT || 1313
app.listen(PORT, () => {
    console.log(`I hear ya on port ${PORT}`)
})
