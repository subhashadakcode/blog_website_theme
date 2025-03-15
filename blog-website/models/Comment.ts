import mongoose from "mongoose"

// Define the Comment schema
const CommentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    ref: "Post",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Check if the model already exists to prevent overwriting
const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema)

export default Comment

