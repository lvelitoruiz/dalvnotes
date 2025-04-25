import { getRecommendedPosts } from '@/lib/wordpress';
import Link from 'next/link';

// Mapa de colores por categoría (mantenemos la consistencia con FeaturedPostGrid)
const categoryColors: { [key: string]: string } = {
  'development': '#786596',
  'design': '#ff5a91',
  'tutorial': '#ffb41f',
  'articles': '#81adcc',
  'default': '#7e4b71'
};

interface WordPressPost {
  id: string;
  title: string;
  date: string;
  slug: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

export async function RecommendedPosts() {
  const posts = await getRecommendedPosts();
  console.log('Recommended posts from WordPress:', posts);

  if (!posts || posts.length === 0) {
    return null;
  }

  const recommendedPosts = posts.map((post: WordPressPost, index: number) => ({
    number: index + 1,
    title: post.title,
    date: new Date(post.date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).toUpperCase(),
    color: categoryColors[post.categories?.nodes[0]?.slug || 'default'],
    slug: post.slug
  }));

  return (
    <div className="flex flex-col gap-1">
      <div className="bg-[#fbfaf8] p-4 text-center">
        <h3 className="text-[15px] text-[#161e24] font-bold">— RECOMENDADOS —</h3>
      </div>
      <div className="flex flex-col gap-1">
        {recommendedPosts.map((post: {
          number: number;
          title: string;
          date: string;
          color: string;
          slug: string;
        }) => (
          <Link key={post.number} href={`/post/${post.slug}`} className="group block bg-[#fbfaf8] p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 h-10 w-10">
                <div className="h-10 w-10 rounded-full text-white flex items-center justify-center font-bold text-[12px]" style={{ backgroundColor: post.color }}>{post.number}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{post.title}</p>
                <p className="text-sm font-medium text-gray-500">{post.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 