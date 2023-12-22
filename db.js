import mongoose from "mongoose";
import { nanoid } from "nanoid";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://wildanfr002:5ydUlm3cEixEQDYu@cluster0.aeqxxlj.mongodb.net/?retryWrites=true&w=majority",
    {
      minPoolSize: 10,
      maxPoolSize: 400,
    }
  );
};

export const db = mongoose.connection.useDb("contact_db", {
  useCache: true,
});

export const contactSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(8),
  },
  Nama: String,
  email: String,
  keluhann: String,
  saran: String,
  masukan: String,
  untuk: String,
  Message: String,
});
