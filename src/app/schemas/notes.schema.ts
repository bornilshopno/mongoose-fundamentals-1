import { Schema } from "mongoose";
import { INotes } from "../interfaces/notes.interface";

export const noteSchema = new Schema<INotes>({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["Personal", "Work", "Study"],
    default: "Personal"
  },
  pinned: { type: Boolean, default: false },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "Green" }
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  versionKey: false,
  timestamps: true
});
