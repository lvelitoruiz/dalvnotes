export interface WordPressImage {
  sourceUrl: string;
  altText: string;
}

export interface WordPressPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage: {
    node: WordPressImage;
  } | null;
}

export interface WordPressPostsResponse {
  posts: {
    nodes: WordPressPost[];
  };
} 