const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://vattsal:vattsal123@cluster0.jyrkf.mongodb.net`
  );
};
