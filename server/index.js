const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers

const contactRouter = require("./routes/Contact");
app.use("/contact", contactRouter);

db.sequelize.sync().then(() => {
  app.listen(3003, () => {
    console.log("server running on port 3003");
  });
});
