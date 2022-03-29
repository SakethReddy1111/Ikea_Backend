const express = require(`express`);
const app = express();
app.use(express.json());

const connect = require("./configs/db");

app.listen(8000, async (req, res) => {
  try {
    await connect();
    console.log("Post is listening on 8000");
  } catch (err) {
    console.log("err", err);
  }
});
