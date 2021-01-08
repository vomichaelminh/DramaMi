import Drama from "../models/drama.js";

export const createDrama = async (req, res) => {
  try {
    const { title, description, image, rating } = req.body;

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
      rating,
      userId: req.user,
    });
    const savedDrama = await newDrama.save();
    res.json(savedDrama);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDramas = async (req, res) => {
  const dramas = await Drama.find({ userId: req.user });
  res.json(dramas);
};

export const deleteDrama = async (req, res) => {
  const drama = await Drama.findOne({ userId: req.user, _id: req.params.id });
  if (!drama) {
    return res.status(400).json({
      message: "No drama found with this ID that belongs to the current user.",
    });
  }
  const deletedDrama = await Drama.findByIdAndDelete(req.params.id);
  res.json(deletedDrama);
};
