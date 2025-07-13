// src/blog/index.js

// Import all your blog posts

import { welcomeToMyJourney } from './a.js';

// Export array of all posts (newest first)
export const BLOG_POSTS = [
    welcomeToMyJourney, // Jan 15, 2025
  // Add new posts here
];

// Helper function to get post by ID
export const getPostById = (id) => {
  return BLOG_POSTS.find(post => post.id === id);
};

// Helper function to get recent posts
export const getRecentPosts = (limit = 5) => {
  return BLOG_POSTS.slice(0, limit);
};
