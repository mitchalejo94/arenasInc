const express = require("express");
const router = express.Router();
const { AdminUsers } = require("../models");
const bcrypt = require("bcrypt");

//POST - Only admin User.
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      AdminUsers.create({
        username: username,
        password: hash,
      });
    });
    // await AdminUsers.create(postAdminUser);
    res.json("success");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
