const express = require(`express`);
const connect = require("./configs/db");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
//require razorpay
const Razorpay = require("razorpay");

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

//razorpay

var instance = new Razorpay({
  key_id: "rzp_test_VsoO9BEK2erzgZ",
  key_secret: "IWbeDhHIJTPPJPAlFb85WZU2",
});

//create order id
app.post("/create/orderId", async (req, res) => {
  try {
    var options = {
      amount: req.body.amount, // amount in the smallest currency unit
      currency: "INR",
      receipt: "steve_id_1",
    };
    instance.orders.create(options, function (err, order) {
      console.log(order);
      // OrderDetails.create(order);
      return res.status(201).send({ orderId: order.id });
    });
  } catch (e) {
    return res.status(500).send({ rzp_ord_err: e.message });
  }
});

//saving details

app.post("/saveOrderDetails", async (req, res) => {
  try {
    const details = await OrderDetails.create(req.body);
    return res.status(201).send(details);
  } catch (e) {
    return res.status(500).send({ orderSaveErr: e.message });
  }
});

//verify signature
app.post("/api/payment/verify", (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", "Wok5mJv2F0pa5HKLeXZfUr9r")
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { signatureIsValid: "true" };
  res.send(response);
});

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`port is listening on ${PORT}`);
  } catch (err) {
    console.log("err", err);
  }
});
