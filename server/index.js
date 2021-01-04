import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Homepage");
});

mongoose.connect(
  process.env.CONNECT_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to db!");
  }
);

mongoose.set("useFindAndModify", false);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
