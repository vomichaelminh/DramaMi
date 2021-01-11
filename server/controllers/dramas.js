import Drama from "../models/drama.js";

export const getDramas = async (req, res) => {
  try {
    const dramas = await Drama.find({ userId: req.user });

    res.status(200).json(dramas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDrama = async (req, res) => {
  const { id } = req.params;
  try {
    const drama = await Drama.find({ userId: req.user, _id: id });
    res.status(200).json(drama);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDrama = async (req, res) => {
  const { title, description, image, rating } = req.body;

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

  try {
    const savedDrama = await newDrama.save();
    res.status(201).json(savedDrama);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateDrama = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, rating } = req.body;
  const drama = await Drama.findOne({ userId: req.user, _id: id });
  if (!drama) {
    return res.status(400).json({
      message: "No drama found with this ID that belongs to the current user.",
    });
  }

  const updatedDrama = { title, description, image, rating, _id: id };
  await Drama.findByIdAndUpdate(id, updatedDrama, { new: true });
  res.json(updatedDrama);
};

export const deleteDrama = async (req, res) => {
  const drama = await Drama.findOne({ userId: req.user, _id: req.params.id });
  if (!drama) {
    return res.status(400).json({
      message: "No drama found with this ID that belongs to the current user.",
    });
  }
  await Drama.findByIdAndDelete(req.params.id);
  res.json({ message: "Drama deleted successfully" });
};
