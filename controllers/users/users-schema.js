import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  firstName: String,
  lastName: String,
}, { collection: "users" });
export default usersSchema;