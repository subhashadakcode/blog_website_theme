"use server"

import { connectToDatabase } from "@/lib/mongodb"
import Post from "@/models/Post"
import Comment from "@/models/Comment"
import { revalidatePath } from "next/cache"

export async function getAllPosts() {
  try {
    await connectToDatabase()
    const posts = await Post.find({}).sort({ date: -1 })
    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    console.error("Error fetching all posts:", error)
    return []
  }
}

export async function getFeaturedPosts() {
  try {
    await connectToDatabase()
    const posts = await Post.find({}).sort({ date: -1 }).limit(3)
    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    console.error("Error fetching featured posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  try {
    await connectToDatabase()
    const post = await Post.findOne({ slug })

    if (!post) {
      return null
    }

    return JSON.parse(JSON.stringify(post))
  } catch (error) {
    console.error("Error fetching post by slug:", error)
    return null
  }
}

export async function getComments(postId: string) {
  try {
    await connectToDatabase()
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 })
    return JSON.parse(JSON.stringify(comments))
  } catch (error) {
    console.error("Error fetching comments:", error)
    return []
  }
}

export async function addComment(data: {
  postId: string
  name: string
  email?: string
  content: string
}) {
  try {
    await connectToDatabase()

    const newComment = new Comment({
      postId: data.postId,
      name: data.name,
      email: data.email || "",
      content: data.content,
      createdAt: new Date(),
    })

    await newComment.save()
    revalidatePath(`/blog/${data.postId}`)

    return JSON.parse(JSON.stringify(newComment))
  } catch (error) {
    console.error("Error adding comment:", error)
    throw new Error("Failed to add comment")
  }
}

export async function sendContactMessage(formData: FormData) {
  // In a real application, you would send this data to your email service
  // or store it in a database

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  console.log("Contact form submission:", { name, email, subject, message })

  // For demo purposes, we'll just redirect back to the contact page
  // In a real app, you would handle success/error states
  revalidatePath("/contact")
}

