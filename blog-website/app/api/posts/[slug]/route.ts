import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Post from "@/models/Post"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    await connectToDatabase()
    const post = await Post.findOne({ slug })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const { title, content, excerpt, author } = await request.json()

    await connectToDatabase()

    const post = await Post.findOne({ slug })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (title) post.title = title
    if (content) post.content = content
    if (excerpt) post.excerpt = excerpt
    if (author) post.author = author

    await post.save()

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    await connectToDatabase()
    const post = await Post.findOneAndDelete({ slug })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}

