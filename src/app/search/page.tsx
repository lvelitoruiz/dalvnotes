import { PostGrid } from '@/components/PostCard/PostGrid';
import { Newsletter } from '@/components/Newsletter/Newsletter';
import { searchPosts } from '@/lib/wordpress';
import { Suspense } from 'react';

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

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchTerm = searchParams.q || '';
  const posts = searchTerm ? await searchPosts(searchTerm) : [];

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

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto mb-12">
          <form action="/search" className="flex gap-4">
            <input
              type="search"
              name="q"
              defaultValue={searchTerm}
              placeholder="Buscar posts..."
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff2c72] focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#161e24] text-white rounded-md hover:bg-[#ff2c72] transition-colors duration-200"
            >
              Buscar
            </button>
          </form>
        </div>

        <Suspense fallback={<div>Cargando...</div>}>
          {searchTerm ? (
            posts.length > 0 ? (
              <PostGrid
                posts={formattedPosts}
                title={`Resultados de la búsqueda para "${searchTerm}"`}
                description={`Encontrados ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} que coinciden con tu búsqueda`}
              />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">No se encontraron resultados</h2>
                <p className="text-gray-600">
                  No se encontraron posts que coincidan con &quot;{searchTerm}&quot;. Intenta con un término de búsqueda diferente.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Search Posts</h2>
              <p className="text-gray-600">
                Ingresa un término de búsqueda arriba para encontrar posts.
              </p>
            </div>
          )}
        </Suspense>
      </div>
      <Newsletter />
    </main>
  );
} 