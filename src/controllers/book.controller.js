const express = require("express");

const Book = require("../models/book.model");

const Author = require("../models/author.model.js");

const router = express.Router();

router.post("", async (req, res) => {
    try {
      const user = await Book.create(req.body);
  
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("", async (req, res) => {
    try {
      const users = await Book.find().populate({path:"section_id", select:"id",select:"section_name"})
      .populate({path:"authors_ids", select:"id",select:"first_name"})
      .lean().exec();
    









      return res.send({ users });
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  
  
  
  router.get("/:id", async (req, res) => {
    try {
      const user = await Book.find()
      .populate({path:"authors_ids", select:"first_name"})
      .lean().exec();

   /*   console.log(user);
    console.log(`new ObjectId("${req.params.id}")`)
       console.log("authors :-   ",user[0].authors_ids[0].first_name);*/

// if(req.params.id ==  user[0].authors_ids[0].first_name){
//   console.log("YES>>>>>")
// }  
      let books_By_SingleAuthor = [];
      for(var i = 0 ; i < user.length; i++){

        for(var j = 0; j < user[i].authors_ids.length; j++){

          if(user[i].authors_ids[j].first_name ==  req.params.id){
            books_By_SingleAuthor.push(user[i]);
            
          }

        }
           
      }
      // console.log(arr)
     return res.send({books_By_SingleAuthor})



  
      
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      const user = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const user = await Book.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  module.exports  = router