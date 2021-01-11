import express from "express";
import auth from "../middleware/auth.js";

import {
  getDramas,
  createDrama,
  deleteDrama,
  updateDrama,
  getDrama,
} from "../controllers/dramas.js";

const router = express.Router();

// create a drama
router.post("/", auth, createDrama);

// get all user's dramas
router.get("/", auth, getDramas);

// get a user's drama
router.get("/:id", auth, getDrama);

// edit a drama
router.patch("/:id", auth, updateDrama);

// delete a drama
router.delete("/:id", auth, deleteDrama);

export default router;
