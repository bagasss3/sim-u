import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ormawaSchema = mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  description: {
    type: String,
  },
  photo: String,
});

const Ormawa = mongoose.model("Ormawa", ormawaSchema);

export { Ormawa };
