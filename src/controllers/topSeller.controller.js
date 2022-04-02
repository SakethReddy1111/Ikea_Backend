const express = require("express");
const router = express.Router();

const TopSeller = require("../models/topSeller.model");

// try{

// }catch(err){

// }
//create topSeller
router.post("/", async (req, res) => {
  try {
    const topSeller = await TopSeller.create(req.body);
    return res.status(200).send(topSeller);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//Get All

router.get("/", async (req, res) => {
  try {
    const topSeller = await TopSeller.find().lean().exec();
    return res.status(201).send(topSeller);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
