import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  birth_date: Date,
  nim: String,
  faculty: String,
  major: String,
  batch_year: Number,
  photo: String,
});

const Student = mongoose.model("Student", studentSchema);

export { Student };
