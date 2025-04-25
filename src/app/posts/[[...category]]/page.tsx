import { PostGrid } from '@/components/PostCard/PostGrid';
import { Newsletter } from '@/components/Newsletter/Newsletter';
import { getPosts } from '@/lib/wordpress';

interface WordPressPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
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
  };
}

// Mapa de colores por categoría
const categoryColors: { [key: string]: string } = {
  'development': '#786596',
  'design': '#ff5a91',
  'tutorial': '#ffb41f',
  'articles': '#81adcc',
  'default': '#7e4b71'
};

type PageProps = {
  params: {
    category?: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PostsPage({ params }: PageProps) {
  const category = params.category?.[0];
  console.log('Category from URL:', category);
  
  // Decodificar la categoría si existe
  const decodedCategory = category ? decodeURIComponent(category) : undefined;
  console.log('Decoded category:', decodedCategory);
  
  const posts = await getPosts(decodedCategory);
  console.log('Posts from WordPress:', posts);
  
  // Log adicional para ver la estructura de los posts
  if (posts && posts.length > 0) {
    console.log('First post categories:', posts[0].categories);
  }
  
  if (!posts || posts.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-4">
            {category ? `No posts found in ${decodedCategory}` : 'No posts found'}
          </h1>
          <p className="text-lg text-gray-600">
            {category 
              ? `We couldn't find any posts in the ${decodedCategory} category. Please try another category or check back later.`
              : 'We haven\'t published any posts yet. Please check back later.'}
          </p>
        </div>
      </main>
    );
  }

  const formattedPosts = posts.map((post: WordPressPost) => ({
    title: post.title,
    excerpt: post.excerpt || '',
    date: new Date(post.date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    category: post.categories?.nodes[0]?.name || 'Uncategorized',
    imageUrl: post.featuredImage?.node?.sourceUrl || '/img/default-post.jpg',
    color: categoryColors[post.categories?.nodes[0]?.slug || 'default'],
    slug: post.slug
  }));

  const title = category 
    ? `${decodeURIComponent(category).charAt(0).toUpperCase() + decodeURIComponent(category).slice(1)} Posts`
    : 'All Posts';
    
  const description = category
    ? `Explore our collection of ${decodeURIComponent(category).toLowerCase()} related articles and tutorials`
    : 'Discover articles and tutorials about design, development, and more';

  return (
    <main className="min-h-screen bg-background">
      <PostGrid
        posts={formattedPosts}
        title={title}
        description={description}
      />
      <Newsletter />
    </main>
  );
} 