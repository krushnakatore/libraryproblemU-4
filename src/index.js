const express = require("express");
const mongoose = require("mongoose");


const User = require("./models/user.model")

const Section = require("./models/section.model")

const Book = require("./models/book.model")

const Author = require("./models/author.model")

const Checkout = require("./models/checkout.model")

const userController = require("./controllers/user.controller")

const sectionController = require("./controllers/section.controller")

const bookController = require("./controllers/book.controller")

const authorController = require("./controllers/author.controller")

const checkoutController =  require("./controllers/checkout.controller")

/*   
1 - connect to mongodb server -- DONE
2 - create a schema for our data
3 - create a model from the schema
*/

// Step 1
const connect = require("./config/db");


// Users Mongoose


// Post Mongoose
// posts collection

// Comment Mongoose => Post and comment are one to many relationship


// Tags Mongoose => Post and Tags are in a many to many relationship


const app = express();

app.use(express.json());

/*
  users
  post = /users
  get all = /users
  get one = /users/:id
  update one = /users/:id
  delete one = /users/:id
*/

// USERS CRUD

app.use("/users",userController)
app.use("/sections",sectionController)
app.use("/books",bookController)
app.use("/authors",authorController)
app.use("/checkout",checkoutController)

// ------------ TAGS CRUD -----------------

// ------------ POSTS CRUD -----------------//

// ------------ COMMENTS CRUD -----------------//


app.listen(2360, async function () {
  await connect();
  console.log("listening on port 2360");
});
