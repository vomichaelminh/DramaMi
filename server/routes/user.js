import express from "express";
import auth from "../middleware/auth.js";

import {
  registerUser,
  loginUser,
  tokenIsValid,
  getUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/delete", auth, deleteUser);

router.post("/tokenIsValid", tokenIsValid);

router.get("/", auth, getUser);

export default router;
