import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Post from "@/models/Post"

export async function GET() {
  try {
    await connectToDatabase()
    const posts = await Post.find({}).sort({ date: -1 })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, excerpt, author, slug } = await request.json()

    if (!title || !content || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectToDatabase()

    const newPost = new Post({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + "...",
      author: author || "Admin",
      slug,
      date: new Date(),
    })

    await newPost.save()

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

