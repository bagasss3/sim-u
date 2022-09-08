import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role_id: {
    type: Number,
    enum: [0, 1, 2],
  },
});

const User = mongoose.model("User", userSchema);

export { User };
