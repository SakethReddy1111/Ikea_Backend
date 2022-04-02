const express = require(`express`);
const connect = require("./configs/db");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 8000;

const productController = require("./controllers/product.controller");

const categoryController = require("./controllers/category.controller");

const userController = require("./controllers/user.controller");
const topSellerController = require("./controllers/topSeller.controller");

//route + controller
app.use("/products", productController);
app.use("/categories", categoryController);
app.use("/user", userController);
app.use("/topsellers", topSellerController);

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`port is listening on ${PORT}`);
  } catch (err) {
    console.log("err", err);
  }
});
