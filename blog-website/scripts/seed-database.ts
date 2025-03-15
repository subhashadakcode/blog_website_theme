"use client"

// This script can be used to seed the database with initial blog posts
// Run it with: npx tsx scripts/seed-database.ts

import mongoose from "mongoose"
import Post from "../models/Post"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable")
  process.exit(1)
}

const samplePosts = [
  {
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    content: `
      <p>Next.js is a React framework that enables server-side rendering and static site generation for React applications. It's a powerful tool for building modern web applications.</p>
      
      <h2>Why Next.js?</h2>
      <p>Next.js provides a great developer experience with features like:</p>
      <ul>
        <li>Server-side rendering</li>
        <li>Static site generation</li>
        <li>API routes</li>
        <li>File-based routing</li>
        <li>Built-in CSS and Sass support</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js app, run the following command:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>
      
      <p>This will create a new Next.js app in the my-app directory. Navigate to the directory and start the development server:</p>
      <pre><code>cd my-app
npm run dev</code></pre>
      
      <p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser to see your app.</p>
      
      <h2>Conclusion</h2>
      <p>Next.js is a fantastic framework for building React applications. It provides a great developer experience and enables you to build fast, SEO-friendly applications with ease.</p>
    `,
    excerpt: "Learn how to get started with Next.js, a powerful React framework for building modern web applications.",
    author: "John Doe",
    date: new Date("2023-01-15"),
    featured: true,
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    title: "Understanding React Hooks",
    slug: "understanding-react-hooks",
    content: `
      <p>React Hooks were introduced in React 16.8 and have revolutionized how we write React components. They allow you to use state and other React features without writing a class.</p>
      
      <h2>Common Hooks</h2>
      <p>Here are some of the most commonly used hooks:</p>
      
      <h3>useState</h3>
      <p>The useState hook allows you to add state to functional components:</p>
      <pre><code>import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>
      
      <h3>useEffect</h3>
      <p>The useEffect hook allows you to perform side effects in functional components:</p>
      <pre><code>import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>
      
      <h2>Custom Hooks</h2>
      <p>You can also create your own custom hooks to reuse stateful logic between components:</p>
      <pre><code>import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
}

function MyComponent() {
  const width = useWindowWidth();
  return <div>Window width: {width}</div>;
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>React Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They allow you to write more concise and readable code, and make it easier to reuse stateful logic between components.</p>
    `,
    excerpt:
      "Learn about React Hooks and how they can simplify your React components and make your code more reusable.",
    author: "Jane Smith",
    date: new Date("2023-02-20"),
    featured: true,
    tags: ["React", "Hooks", "JavaScript"],
  },
  {
    title: "CSS Grid Layout: A Complete Guide",
    slug: "css-grid-layout-complete-guide",
    content: `
      <p>CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay out items in rows and columns, and has many features that make building complex layouts straightforward.</p>
      
      <h2>Basic Concepts</h2>
      <p>To create a grid container, you set the display property to grid:</p>
      <pre><code>.container {
  display: grid;
}</code></pre>
      
      <p>You can then define the columns and rows using the grid-template-columns and grid-template-rows properties:</p>
      <pre><code>.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
}</code></pre>
      
      <p>This creates a grid with three equal-width columns and two rows of 100px and 200px height.</p>
      
      <h2>Grid Items</h2>
      <p>You can place items on the grid using the grid-column and grid-row properties:</p>
      <pre><code>.item {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}</code></pre>
      
      <p>This places the item from column line 1 to column line 3, and from row line 1 to row line 2.</p>
      
      <h2>Grid Areas</h2>
      <p>You can also name areas of the grid and place items in those areas:</p>
      <pre><code>.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px 100px;
  grid-template-areas: 
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

.footer {
  grid-area: footer;
}</code></pre>
      
      <h2>Responsive Grids</h2>
      <p>CSS Grid makes it easy to create responsive layouts. You can use the repeat() function with auto-fit or auto-fill to create a responsive grid:</p>
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}</code></pre>
      
      <p>This creates a grid where each column is at least 200px wide, and the number of columns adjusts automatically based on the available space.</p>
      
      <h2>Conclusion</h2>
      <p>CSS Grid Layout is a powerful tool for creating complex layouts on the web. It provides a level of control that was previously impossible with CSS, and makes it easier to create responsive designs.</p>
    `,
    excerpt: "Learn how to use CSS Grid Layout to create complex, responsive layouts for your web projects.",
    author: "Alex Johnson",
    date: new Date("2023-03-10"),
    featured: false,
    tags: ["CSS", "Grid", "Web Design"],
  },
  {
    title: "Introduction to TypeScript",
    slug: "introduction-to-typescript",
    content: `
      <p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.</p>
      
      <h2>Why TypeScript?</h2>
      <p>TypeScript adds static types to JavaScript, which can help prevent bugs and make your code more readable and maintainable. It also provides great tooling, including:</p>
      <ul>
        <li>Type checking</li>
        <li>Code completion</li>
        <li>Refactoring</li>
        <li>Source documentation</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To install TypeScript, run:</p>
      <pre><code>npm install -g typescript</code></pre>
      
      <p>Create a file called hello.ts:</p>
      <pre><code>function greet(person: string) {
  return "Hello, " + person;
}

console.log(greet("TypeScript"));</code></pre>
      
      <p>Compile it with the TypeScript compiler:</p>
      <pre><code>tsc hello.ts</code></pre>
      
      <p>This will generate a hello.js file that you can run with Node.js.</p>
      
      <h2>Basic Types</h2>
      <p>TypeScript supports several basic types:</p>
      <pre><code>// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String
let color: string = "blue";
color = 'red';

// Array
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number] = ["hello", 10];

// Enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

// Void
function warnUser(): void {
  console.log("This is a warning message");
}

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
  throw new Error(message);
}

// Object
let obj: object = {};</code></pre>
      
      <h2>Interfaces</h2>
      <p>Interfaces are a powerful way to define contracts within your code:</p>
      <pre><code>interface Person {
  firstName: string;
  lastName: string;
  age?: number; // Optional property
  readonly id: number; // Read-only property
}

function greet(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User", id: 1 };
console.log(greet(user));</code></pre>
      
      <h2>Conclusion</h2>
      <p>TypeScript is a powerful tool for building large-scale JavaScript applications. It provides static typing and other features that can help you write more robust and maintainable code.</p>
    `,
    excerpt: "Learn the basics of TypeScript, a strongly typed programming language that builds on JavaScript.",
    author: "Sarah Lee",
    date: new Date("2023-04-05"),
    featured: true,
    tags: ["TypeScript", "JavaScript", "Programming"],
  },
  {
    title: "Mastering Git: Essential Commands and Workflows",
    slug: "mastering-git-essential-commands-workflows",
    content: `
      <p>Git is a distributed version control system that helps you track changes in your code and collaborate with others. This guide covers essential Git commands and workflows.</p>
      
      <h2>Basic Commands</h2>
      
      <h3>Initializing a Repository</h3>
      <pre><code>git init</code></pre>
      
      <h3>Cloning a Repository</h3>
      <pre><code>git clone https://github.com/username/repository.git</code></pre>
      
      <h3>Checking Status</h3>
      <pre><code>git status</code></pre>
      
      <h3>Adding Files</h3>
      <pre><code>git add filename    # Add a specific file
git add .         # Add all files</code></pre>
      
      <h3>Committing Changes</h3>
      <pre><code>git commit -m "Commit message"</code></pre>
      
      <h3>Pushing Changes</h3>
      <pre><code>git push origin branch-name</code></pre>
      
      <h3>Pulling Changes</h3>
      <pre><code>git pull origin branch-name</code></pre>
      
      <h2>Branching</h2>
      
      <h3>Creating a Branch</h3>
      <pre><code>git branch branch-name</code></pre>
      
      <h3>Switching to a Branch</h3>
      <pre><code>git checkout branch-name</code></pre>
      
      <h3>Creating and Switching to a Branch</h3>
      <pre><code>git checkout -b branch-name</code></pre>
      
      <h3>Merging Branches</h3>
      <pre><code>git checkout main
git merge branch-name</code></pre>
      
      <h2>Git Workflows</h2>
      
      <h3>Feature Branch Workflow</h3>
      <p>The Feature Branch Workflow is a simple workflow where each new feature is developed in a dedicated branch:</p>
      <ol>
        <li>Create a new branch for each feature: <code>git checkout -b feature-name</code></li>
        <li>Make changes and commit them: <code>git add . && git commit -m "Implement feature"</code></li>
        <li>Push the branch to the remote repository: <code>git push origin feature-name</code></li>
        <li>Create a pull request for code review</li>
        <li>After approval, merge the feature branch into the main branch</li>
      </ol>
      
      <h3>Gitflow Workflow</h3>
      <p>The Gitflow Workflow is a more structured workflow that defines specific branch roles:</p>
      <ul>
        <li><strong>main</strong>: Production-ready code</li>
        <li><strong>develop</strong>: Latest development changes</li>
        <li><strong>feature/*</strong>: New features</li>
        <li><strong>release/*</strong>: Preparing for a release</li>
        <li><strong>hotfix/*</strong>: Urgent fixes for production</li>
      </ul>
      
      <h2>Advanced Git Commands</h2>
      
      <h3>Viewing History</h3>
      <pre><code>git log
git log --oneline
git log --graph</code></pre>
      
      <h3>Stashing Changes</h3>
      <pre><code>git stash
git stash pop</code></pre>
      
      <h3>Rebasing</h3>
      <pre><code>git rebase branch-name</code></pre>
      
      <h3>Resetting</h3>
      <pre><code>git reset --soft HEAD~1  # Undo last commit, keep changes
git reset --hard HEAD~1  # Undo last commit, discard changes</code></pre>
      
      <h2>Conclusion</h2>
      <p>Git is a powerful tool for version control and collaboration. By mastering these essential commands and workflows, you'll be able to work more efficiently and collaborate more effectively with your team. Remember to commit often, write clear commit messages, and use branches to organize your work.</p>
    `,
    excerpt:
      "Learn essential Git commands and workflows to improve your version control skills and collaborate more effectively.",
    author: "Michael Chen",
    date: new Date("2023-05-12"),
    featured: false,
    tags: ["Git", "Version Control", "Development"],
  },
]

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing posts
    await Post.deleteMany({})
    console.log("Cleared existing posts")

    // Insert sample posts
    const result = await Post.insertMany(samplePosts)
    console.log(`Added ${result.length} sample posts to the database`)

    mongoose.disconnect()
    console.log("Database seeding completed")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()

