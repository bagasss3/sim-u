import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sessionSchema = mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  refresh_token: String,
  refresh_token_expired_at: {
    type: Number,
    index: { expires: "5d" },
  },
});

const Session = mongoose.model("Session", sessionSchema);
export { Session };
