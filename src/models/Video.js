import mongoose from "mongoose";

const videoSchem = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 80 },
  description: { type: String, required: true, minlength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

const Video = mongoose.model("Video", videoSchem);

export default Video;
