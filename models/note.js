import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    // Optional legacy field: older records stored iv separately.
    iv: { type: String, default: undefined },
  },
  { timestamps: true },
);

export default mongoose.model("Note", noteSchema);
