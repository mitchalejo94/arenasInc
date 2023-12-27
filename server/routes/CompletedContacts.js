const express = require("express");
const router = express.Router();
const { CompletedContacts } = require("../models");

router.post("/", async (req, res) => {
  try {
    const completedContactPost = req.body;
    await CompletedContacts.create(completedContactPost);
    res.status(201).json(completedContactPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
