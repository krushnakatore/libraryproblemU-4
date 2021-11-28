const express = require("express");

const Section = require("../models/section.model");



const Book =require("../models/book.model")

const router = express.Router();

router.post("", async (req, res) => {
    try {
      const user = await Section.create(req.body);
  
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  var arr = [];
  
  // console.log(arr)
  router.get("/notcheckout1", async (req, res) => {
    try {
      const user = await Book.find()
      .populate({path:"user_id"})
      .populate({path:"authors_ids"})
      .populate({path:"section_id"})
      .lean().exec();
         
          let notCheckout = [];
       
         for(let i = 0; i < user.length;i++){
          if(user[i].user_id === undefined){
            notCheckout.push(user[i])
          } 
          
          
         }
     
      return res.status(201).send({notCheckout});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  router.get("/:name", async (req, res) => {
    try {
      const user = await Book.find()
      .populate({path:"user_id"})
      .populate({path:"authors_ids"})
      .populate({path:"section_id"})
      .lean().exec();
         
      // console.log(req.params.name)
          let author = [];
       
         for(let i = 0; i < user.length;i++){

            for(let j = 0; j < user[i].authors_ids.length; j++){
              if(req.params.name === user[i].authors_ids[j].first_name){
                author.push(user[i])
            }
          
          } 
          
          
         }
     
      return res.status(201).send({author});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const users = await Book.find()
      .populate({path:"section_id"})
      
      .lean().exec();
      console.log(users)

      console.log(users[0].section_id.section_name)
      
      var sectionContainsBooks = [];
      for(let i = 0; i < users.length; i++){
        if(req.params.id == users[i].section_id.section_name){
           sectionContainsBooks.push(users[i])
        }
      }
  
      return res.send({ sectionContainsBooks });
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const user = await Section.find().lean().exec();
  
      return res.send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      const user = await Section.findByIdAndUpdate(req.params.id, req.body, {
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
      const user = await Section.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  module.exports  = router