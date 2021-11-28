const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      body: { type: String, required: true },
      section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
      },user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false,
      },
      authors_ids: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "author",
          required: true,
        },
      ],
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("book", bookSchema); 
