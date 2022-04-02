const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

// try{

// }catch(err){

// }
//create product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//Get All

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "category", select: "title" })
      .lean()
      .exec();
    return res.status(201).send(products);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//category filter

router.get("/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
      .populate({ path: "category", select: "title" })
      .lean()
      .exec();
    return res.status(201).send(products);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//get one
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({ path: "category" })
      .lean()
      .exec();
    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//patch

router.patch("/:id", async (req, res) => {
  try {
    // 3 para [1. req.params, req.body, {n ew: true}]
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//delete

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
