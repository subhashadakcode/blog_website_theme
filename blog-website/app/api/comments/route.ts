import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Comment from "@/models/Comment"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("postId")

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    await connectToDatabase()
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 })

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { postId, name, email, content } = await request.json()

    if (!postId || !name || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectToDatabase()

    const newComment = new Comment({
      postId,
      name,
      email,
      content,
      createdAt: new Date(),
    })

    await newComment.save()

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}

