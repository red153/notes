import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "need titl"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    user_id: {
      type: Number,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }

);

export default models.Note || model("Note", NoteSchema);
