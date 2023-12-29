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

router.get("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  const notes = await Notes.findAll({ where: { ContactId: contactId } });
  res.json(notes);
});

router.delete("/:noteId", validateToken, async (req, res) => {
  const noteId = req.params.noteId;

  await Notes.destroy({
    where: {
      id: noteId,
    },
  });
  res.json("deleted success");
});

module.exports = router;
