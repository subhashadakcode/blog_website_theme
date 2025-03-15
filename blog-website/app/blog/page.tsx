import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, User } from "lucide-react"
import { getAllPosts } from "@/lib/posts"

export const metadata = {
  title: "Blog | My Blog",
  description: "Read all blog posts",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog Posts</h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Explore all my articles and thoughts on various topics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post._id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="flex items-center text-sm text-muted-foreground">
                <User className="mr-1 h-3 w-3" />
                {post.author}
                <span className="mx-1">•</span>
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" asChild className="w-full">
                <Link href={`/blog/${post.slug}`}>
                  <BookOpen className="mr-2 h-4 w-4" /> Read More
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

