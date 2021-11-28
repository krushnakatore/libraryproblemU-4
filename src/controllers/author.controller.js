const express = require("express");

const Author = require("../models/author.model.js");

const Book = require("../models/book.model.js");

const router = express.Router();

router.post("", async (req, res) => {
    try {
      const user = await Author.create(req.body);
  
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("", async (req, res) => {
    try {
      const users = await Author.find().lean().exec();
  
      return res.send({ users });
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const user = await Author.findById(req.params.id).lean().exec();
  
      return res.send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
//   router.get("/:id", async (req, res) => {
//     try {
//       const user = await Book.findById(req.params.id).lean().exec();
  
//       return res.send(user);
//     } catch (e) {
//       return res.status(500).json({ message: e.message, status: "Failed" });
//     }
//   });
  
  router.patch("/:id", async (req, res) => {
    try {
      const user = await Author.findByIdAndUpdate(req.params.id, req.body, {
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
      const user = await Author.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  module.exports  = router