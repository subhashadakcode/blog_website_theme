"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Send, User } from "lucide-react"
import { addComment, getComments } from "@/lib/actions"

interface Comment {
  _id: string
  name: string
  content: string
  createdAt: string
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  })

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(postId)
        setComments(fetchedComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [postId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.content) {
      return
    }

    try {
      const newComment = await addComment({
        postId,
        name: formData.name,
        email: formData.email,
        content: formData.content,
      })

      setComments((prev) => [newComment, ...prev])
      setFormData({ name: "", email: "", content: "" })
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" /> Leave a Comment
          </CardTitle>
          <CardDescription>Share your thoughts about this post.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email (optional)"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Comment</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Your comment..."
                  className="min-h-32"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" /> Post Comment
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Separator className="my-8" />

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h3>

        {isLoading ? (
          <p className="text-muted-foreground">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <Card key={comment._id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <CardTitle className="text-base">{comment.name}</CardTitle>
                  </div>
                  <CardDescription>{new Date(comment.createdAt).toLocaleDateString()}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{comment.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

