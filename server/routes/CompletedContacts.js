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

router.get("/", async (req, res) => {
  try {
    const completedContactList = await CompletedContacts.findAll();
    res.json(completedContactList);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
