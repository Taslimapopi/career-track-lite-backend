import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    jobUrl: { type: String, trim: true },
    source: {
      type: String,
      enum: ["LinkedIn", "Bdjobs", "Indeed", "Wellfound", "Facebook", "Referral", "Other"],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["Saved", "Applied", "Assessment", "Interview", "Rejected", "Offer"],
      default: "Saved",
    },
    applicationDate: { type: Date, required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

// user + companyName + jobTitle দিয়ে queries fast হবে (list/filter করার সময়)
applicationSchema.index({ user: 1, status: 1 });

const Application = mongoose.model("Application", applicationSchema);

export default Application;