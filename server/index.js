const express = require("express");
const app = express();

const db = require("./models");

//Routers

const contactRouter = require("./routes/Contact");
app.use("/contact", contactRouter);

// const postRouter = require("./routes/Posts");
// app.use("/Posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(3003, () => {
    console.log("server running on port 3003");
  });
});
