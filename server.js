import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import {
  getContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "./api.js";
import { corsCustom } from "./middleware.js";

connectDB();

const app = express();

app.use(cors());
app.use(corsCustom(req, res, next));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", getContact);
app.get("/:id", getContactById);
app.post("/", createContact);
app.patch("/:id", updateContact);
app.delete("/:id", deleteContact);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is listening on http://localhost:${process.env.PORT || 3000}`
  );
});
