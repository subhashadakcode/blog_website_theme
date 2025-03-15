import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "About | My Blog",
  description: "Learn more about me and my blog",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Learn more about who I am and why I write.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">My Story</h2>
            <p className="text-muted-foreground mb-4">
              Hello! I'm a passionate writer and developer who loves sharing knowledge and experiences through this
              blog. I started this journey to document my learning process and help others who might be on a similar
              path.
            </p>
            <p className="text-muted-foreground">
              With a background in technology and a love for creative writing, I aim to bridge the gap between technical
              concepts and engaging storytelling. My goal is to make complex topics accessible and enjoyable for
              everyone.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">About This Blog</h2>
            <p className="text-muted-foreground mb-4">
              This blog is a platform where I share my thoughts, insights, and experiences on various topics including
              technology, personal development, and creative pursuits. I believe in the power of sharing knowledge and
              learning from each other.
            </p>
            <p className="text-muted-foreground">
              All content is written with care and attention to detail. I strive to provide valuable information that
              can help you in your own journey, whatever that may be.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">My Interests</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Web Development and Design</li>
              <li>Creative Writing and Storytelling</li>
              <li>Photography and Visual Arts</li>
              <li>Reading and Learning New Skills</li>
              <li>Exploring Nature and Traveling</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

