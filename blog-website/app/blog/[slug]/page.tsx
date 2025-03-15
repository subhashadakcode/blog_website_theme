import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getPostBySlug } from "@/lib/posts"
import CommentSection from "@/components/comment-section"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </Button>

      <article className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{post.title}</h1>

        <div className="flex items-center text-muted-foreground mb-8">
          <User className="mr-1 h-4 w-4" />
          <span className="mr-4">{post.author}</span>
          <Calendar className="mr-1 h-4 w-4" />
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        </div>

        <div className="mt-8 mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

        <Separator className="my-12" />

        <CommentSection postId={post._id} />
      </article>
    </div>
  )
}

