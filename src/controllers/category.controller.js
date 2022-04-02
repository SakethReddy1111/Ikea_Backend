const express = require("express");
const router = express.Router();

const Category = require("../models/category.model");

// try{

// }catch(err){

// }
//create category
router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(200).send(category);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//Get All

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().lean().exec();
    return res.status(201).send(categories);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//get one
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).lean().exec();
    return res.status(201).send(category);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//patch

router.patch("/:id", async (req, res) => {
  try {
    // 3 para [1. req.params, req.body, {n ew: true}]
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(category);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//delete

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(201).send(category);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
