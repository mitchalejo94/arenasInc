const express = require("express");
const router = express.Router();
const { CompletedContacts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

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

router.get("/", validateToken, async (req, res) => {
  try {
    const completedContactList = await CompletedContacts.findAll();
    res.json(completedContactList);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:contactId", validateToken, async (req, res) => {
  try {
    const id = req.params.contactId;
    const completedContacts = await CompletedContacts.findByPk(id);
    if (!completedContacts) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(completedContacts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const completedContacts = await CompletedContacts.findByPk(contactId);

    if (!completedContacts) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await completedContacts.destroy();
    res.json("deleted success");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
