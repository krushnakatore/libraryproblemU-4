const express = require("express");

const Checkout = require("../models/checkout.model.js");

const router = express.Router();

router.post("", async (req, res) => {
    try {
      const user = await Checkout.create(req.body);
  
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("", async (req, res) => {
    try {
      const users = await Checkout.find()
      .populate({path:"user_id",select:"first_name"})
      .populate({path:"book_id",select:"title"})
      .lean()
      .exec();
     
  
      return res.send({ users });
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const user = await Checkout.findById(req.params.id).lean().exec();
  
      return res.send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      const user = await Checkout.findByIdAndUpdate(req.params.id, req.body, {
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
      const user = await Checkout.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

  module.exports  = router