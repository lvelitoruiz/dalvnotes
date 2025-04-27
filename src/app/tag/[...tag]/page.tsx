import { PostGrid } from '@/components/PostCard/PostGrid';
import { Newsletter } from '@/components/Newsletter/Newsletter';
import { getPostsByTag } from '@/lib/wordpress';

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
  tags: {
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

// Mapa de colores por tag
const tagColors: { [key: string]: string } = {
  'highlight': '#ffb41f',
  'featured': '#786596',
  'popular': '#ff5a91',
  'default': '#81adcc'
};

type PageProps = {
  params: {
    tag?: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function TagPage({ params }: PageProps) {
  const tag = params.tag?.[0];
  console.log('Tag from URL:', tag);
  
  // Decodificar el tag si existe
  const decodedTag = tag ? decodeURIComponent(tag) : undefined;
  console.log('Decoded tag:', decodedTag);
  
  const posts = await getPostsByTag(decodedTag);
  console.log('Posts from WordPress:', posts);
  
  if (!posts || posts.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-4">
            {tag ? `No posts found with tag "${decodedTag}"` : 'No posts found'}
          </h1>
          <p className="text-lg text-gray-600">
            {tag 
              ? `We couldn't find any posts with the tag "${decodedTag}". Please try another tag or check back later.`
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
    color: tagColors[post.tags?.nodes[0]?.slug || 'default'],
    slug: post.slug
  }));

  const title = tag 
    ? `Posts etiquetados "${decodedTag}"`
    : 'Todos los posts';
    
  const description = tag
    ? `Explora nuestra colección de posts etiquetados con "${decodedTag}"`
    : 'Descubre artículos y tutoriales sobre diseño, desarrollo y más';

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