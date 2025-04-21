import { FeaturedPost } from './FeaturedPost';

interface Post {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  color: string;
  slug: string;
}

interface PostGridProps {
  posts: Post[];
  title?: string;
  description?: string;
}

export function PostGrid({ posts, title, description }: PostGridProps) {
  return (
    <section className="container mx-auto px-4 py-20">
      {(title || description) && (
        <div className="text-center mb-16">
          {title && (
            <h1 className="text-[38px] lg:text-[70px] text-[#81adcc] font-bold uppercase mb-4">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-[20px] text-[#161e24] font-light">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <FeaturedPost
            key={post.slug}
            {...post}
          />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[20px] text-[#161e24] font-light">
            No posts found in this category.
          </p>
        </div>
      )}
    </section>
  );
} 