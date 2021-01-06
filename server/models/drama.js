import mongoose from "mongoose";

const dramaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Drama = mongoose.model("Drama", dramaSchema);
export default Drama;
