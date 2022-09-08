import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiredAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" },
  },
});

const Token = mongoose.model("Token", tokenSchema);

export { Token };
