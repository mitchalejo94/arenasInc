const express = require("express");
const router = express.Router();
const { Contact } = require("../models");

//Routers
//GET
router.get("/", async (req, res) => {
  const contactList = await Contact.findAll();
  res.json(contactList);
});

//POST
router.post("/", async (req, res) => {
  const commentPost = req.body;
  await Contact.create(commentPost);
  res.json(commentPost);
});

module.exports = router;
