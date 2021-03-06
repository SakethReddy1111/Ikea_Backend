const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    package: { type: String, required: true },
    description: { type: String, required: true },
    img1: { type: String },
    img2: { type: String },
    img3: { type: String },
    img4: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
