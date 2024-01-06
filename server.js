//*********DEPENDENCIES
require("dotenv").config(); //loads .env variables
const express = require("express"); //web framework
const registerGlobalMiddleware = require("./utils/middleware.js");

//********EXPRESS APP OBJECT
const app = express();

//Register middleware
registerGlobalMiddleware(app);

//********ROUTES
//Root
app.get("/", (req, res) => {
  res.send("your server is running ... better go catch it");
});

//********SERVER LISTENER
const PORT = process.env.PORT || 1313;
app.listen(PORT, () => {
  console.log(`I hear ya on port ${PORT}`);
});
