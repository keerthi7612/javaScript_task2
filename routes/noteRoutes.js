import express from "express";
import {
  addNote,
  getDecryptedNotes,
  getEncryptedNotes,
  getDecryptedNoteById,
  getEncryptedNoteById,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/add", addNote);

router.get("/decrypted", getDecryptedNotes);
router.get("/decrypted/:id", getDecryptedNoteById);

router.get("/encrypted", getEncryptedNotes);
router.get("/encrypted/:id", getEncryptedNoteById);

export default router;