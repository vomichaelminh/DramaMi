import express from "express";
import auth from "../middleware/auth.js";
import Drama from "../models/drama.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // validation

    if (!title) {
      return res
        .status(400)
        .json({ message: "You need to enter a drama title." });
    }

    const newDrama = new Drama({
      title,
      description,
      image,
      userId: req.user,
    });
    const savedDrama = await newDrama.save();
    res.json(savedDrama);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  const dramas = await Drama.find({ userId: req.user });
  res.json(dramas);
});

router.delete("/:id", auth, async (req, res) => {
  const drama = await Drama.findOne({ userId: req.user, _id: req.params.id });
  if (!drama) {
    return res.status(400).json({
      message: "No drama found with this ID that belongs to the current user.",
    });
  }
  const deletedDrama = await Drama.findByIdAndDelete(req.params.id);
  res.json(deletedDrama);
});

export default router;
