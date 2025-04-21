import { FeaturedPost } from './FeaturedPost';
import { getFeaturedPosts } from '@/lib/wordpress';

interface WordPressPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
}

interface ProcessedPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  color: string;
  slug: string;
}

// Mapa de colores por categoría
const categoryColors: { [key: string]: string } = {
  'development': '#786596',
  'design': '#ff5a91',
  'tutorial': '#ffb41f',
  'articles': '#81adcc',
  'default': '#7e4b71'
};

export async function FeaturedPostGrid() {
  const posts = await getFeaturedPosts();
  console.log('Posts from WordPress:', posts);

  if (!posts || posts.length === 0) {
    console.log('No posts found');
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No posts found</p>
      </div>
    );
  }

  const featuredPosts = posts.map((post: WordPressPost) => {
    const processedPost = {
      title: post.title || '',
      excerpt: post.excerpt?.replace(/<[^>]*>/g, '') || '', // Removemos HTML del excerpt
      date: new Date(post.date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      category: post.categories?.nodes[0]?.name || 'Uncategorized',
      imageUrl: post.featuredImage?.node?.sourceUrl || '/img/default-post.jpg',
      color: categoryColors[post.categories?.nodes[0]?.slug || 'default'],
      slug: post.slug || ''
    };
    console.log('Processed post:', processedPost);
    return processedPost;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {featuredPosts.map((post: ProcessedPost) => (
        <FeaturedPost
          key={post.slug}
          {...post}
        />
      ))}
    </div>
  );
} 