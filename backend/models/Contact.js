import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  amount: { type: Number, default: 0 },
  collection: { type: Number, default: 0 },
  excessamount: { type: Number, default: 0 },   // renamed for consistency
  excessgiven: { type: Number, default: 0 },
  bending: { type: Number, default: 0 },
  excessbending: { type: Number, default: 0 },
  collectman: {
    type: String,
    enum: ["00011", "00022", "00033"],
    default: "00011",
  },
   date: { type: Date,  required: true }, 
 createdAt: { type: Date, default: Date.now, immutable: true },
});

export default mongoose.model("Contact", contactSchema);
