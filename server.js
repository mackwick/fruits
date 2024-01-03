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



//********MIDDLEWARE



//********ROUTES


//********SERVER LISTENER
const app = express()
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`I'm listening on ${PORT}`)
})
