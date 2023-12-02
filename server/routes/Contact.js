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
router.delete("/:contactId", async (req, res) => {
  const contactId = req.body.contactId;
  await Contact.destroy({
    where: {
      id: contactId,
    },
  });
  res.json("deleted success");
});

module.exports = router;
