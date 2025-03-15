import {
  getAllPosts as fetchAllPosts,
  getFeaturedPosts as fetchFeaturedPosts,
  getPostBySlug as fetchPostBySlug,
} from "@/lib/actions"

// This is a client-side wrapper for the server actions
// It allows us to use the same functions in both client and server components

export async function getAllPosts() {
  return fetchAllPosts()
}

export async function getFeaturedPosts() {
  return fetchFeaturedPosts()
}

export async function getPostBySlug(slug: string) {
  return fetchPostBySlug(slug)
}

