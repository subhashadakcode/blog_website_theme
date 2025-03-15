import mongoose from "mongoose"

// Define the Post schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default: "Admin",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
})

// Check if the model already exists to prevent overwriting
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)

export default Post

