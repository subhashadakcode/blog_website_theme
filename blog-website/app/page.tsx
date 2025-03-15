import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getFeaturedPosts } from "@/lib/posts"
import { ArrowRight, BookOpen, Mail, User } from "lucide-react"

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to My Blog
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore thoughts, ideas, and insights on various topics that matter to me and might interest you.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/blog">
                  Read Blog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Posts</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                Check out some of my most popular and recent articles.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {featuredPosts.map((post) => (
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
          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/blog">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-muted rounded-lg my-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Have a question or want to collaborate? Feel free to reach out.
              </p>
            </div>
            <Button asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

