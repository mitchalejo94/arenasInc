const express = require("express");
const router = express.Router();
const { Notes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const note = req.body;
  const username = req.user.username;
  note.username = username;
  await Notes.create(note);
  res.json(note);
});
module.exports = router;
