import mongoose from "mongoose";
import Note from "../models/Note.js";
import { encrypt, decrypt } from "../utils/cryptoUtil.js";

const toDecryptedNote = (note) => ({
  id: note._id,
  ...(note.title ? { title: note.title } : {}),
  content: decrypt(note.content, note.iv),
  createdAt: note.createdAt,
  updatedAt: note.updatedAt,
});

const toEncryptedNote = (note) => ({
  id: note._id,
  ...(note.title ? { title: note.title } : {}),
  content: note.content,
  ...(note.iv ? { iv: note.iv } : {}),
  createdAt: note.createdAt,
  updatedAt: note.updatedAt,
});

const getValidNoteById = async (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid note id format." });
    return null;
  }

  const note = await Note.findById(id);
  if (!note) {
    res.status(404).json({ error: "Note not found." });
    return null;
  }

  return note;
};

// Add Note
export const addNote = async (req, res) => {
  try {
    const { content } = req.body ?? {};

    if (content === undefined) {
      return res.status(400).json({ error: "content is required." });
    }

    if (content === null) {
      return res.status(400).json({ error: "content cannot be null." });
    }

    if (typeof content !== "string") {
      return res.status(400).json({
        error: `content must be a string, received ${typeof content}.`,
      });
    }

    if (!content.trim()) {
      return res.status(400).json({ error: "content cannot be empty." });
    }

    const payload = {
      content: encrypt(content.trim()),
    };

    const note = await Note.create(payload);

    return res.status(201).json({
      message: "Note saved securely",
      noteId: note._id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getDecryptedNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ _id: -1 });

    const decryptedNotes = [];
    const failedNotes = [];

    for (const note of notes) {
      try {
        decryptedNotes.push(toDecryptedNote(note));
      } catch (error) {
        failedNotes.push({
          id: note._id,
          error: error.message,
        });
      }
    }

    return res.status(200).json({
      message: "Decrypted notes fetched successfully",
      count: decryptedNotes.length,
      failedCount: failedNotes.length,
      notes: decryptedNotes,
      ...(failedNotes.length ? { failedNotes } : {}),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getEncryptedNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ _id: -1 });
    const encryptedNotes = notes.map(toEncryptedNote);

    return res.status(200).json({
      message: "Encrypted notes fetched successfully",
      count: encryptedNotes.length,
      notes: encryptedNotes,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getDecryptedNoteById = async (req, res) => {
  try {
    const note = await getValidNoteById(req.params.id, res);
    if (!note) {
      return;
    }

    try {
      return res.status(200).json({
        message: "Decrypted note fetched successfully",
        note: toDecryptedNote(note),
      });
    } catch (error) {
      return res.status(422).json({
        error: "Note exists but cannot be decrypted with current data/key.",
        details: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getEncryptedNoteById = async (req, res) => {
  try {
    const note = await getValidNoteById(req.params.id, res);
    if (!note) {
      return;
    }

    return res.status(200).json({
      message: "Encrypted note fetched successfully",
      note: toEncryptedNote(note),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getNotes = getDecryptedNotes;
