const express = require("express");
const router = express.Router();
const { Contact } = require("../models");

//Routers
//GET All = main user
router.get("/", async (req, res) => {
  const contactList = await Contact.findAll();
  res.json(contactList);
});

//Get by id//
router.get("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  const contactId = await Contact.findByPk(id);
  res.json(contactId);
});

//POST - anyone
router.post("/", async (req, res) => {
  const commentPost = req.body;
  await Contact.create(commentPost);
  res.json(commentPost);
});

//Delete Route
// router.delete("/:contactId", async (req, res) => {
//   const id = req.body.contactId;
//   const contactIdDestroy = await Contact.findByPk(id);
//   res.json(contactIdDestroy);
// });
router.delete("/:contactId", async (req, res) => {
  const contactId = req.params.contactId; // Fetch the contactId from URL parameter

  try {
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await contact.destroy();
    res.json("deleted success");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
