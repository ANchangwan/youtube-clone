import mongoose from "mongoose";

const videoSchem = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    vies: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchem);

export default Video;
