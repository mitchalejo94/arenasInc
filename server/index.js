const express = require("express");
const app = express();
app.use(express.json());

const db = require("./models");

//Routers

const contactRouter = require("./routes/Contact");
app.use("/contact", contactRouter);

db.sequelize.sync().then(() => {
  app.listen(3003, () => {
    console.log("server running on port 3003");
  });
});
