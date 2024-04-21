import mongoose from "mongoose";

const videoSchem = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, maxlength: 80 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchem.pre("save", async function () {
  this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchem);

export default Video;
