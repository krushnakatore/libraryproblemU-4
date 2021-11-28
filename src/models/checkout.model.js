const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      body: { type: String, required: true },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      book_id: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "book",
          required: true,
        },
        
      
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("checkout", postSchema); 
