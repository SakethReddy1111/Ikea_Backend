const mongoose = require("mongoose");

const productShcema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    package:{ type: String, required: true },
    description: { type: String, required: true },
    articleNo: 
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
