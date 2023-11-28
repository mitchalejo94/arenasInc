const express = require("express");
const router = express.Router();

//Routers
router.get("/", (req, res) => {
  res.send("Hello World of Contact");
});

// router.post();

module.exports = router;
