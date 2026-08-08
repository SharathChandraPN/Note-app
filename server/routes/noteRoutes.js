const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
});

// POST a new note
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Note text is required",
      });
    }

    const note = await Note.create({
      text,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
    });
  }
});

// DELETE a note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json({
      message: "Note deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
    });
  }
});

module.exports = router;