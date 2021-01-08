import express from "express";
import auth from "../middleware/auth.js";

import { getDramas, createDrama, deleteDrama } from "../controllers/dramas.js";

const router = express.Router();

// create a drama
router.post("/", auth, createDrama);

// get all user's dramas
router.get("/", auth, getDramas);

// delete a drama
router.delete("/:id", auth, deleteDrama);

export default router;
