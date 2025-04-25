import Image from 'next/image';
import Link from 'next/link';
import { getHighlightPosts } from '@/lib/wordpress';

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

interface FeaturedPostProps {
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  slug: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  return formatter.format(date).toUpperCase();
}

function FeaturedPost({ title, date, category, imageUrl, excerpt, slug }: FeaturedPostProps) {
  return (
    <Link href={`/posts/${slug}`} className="group">
      <div className="flex flex-col gap-2 mb-5">
        <h2 className="text-white text-[32px] leading-none font-semibold h-[94px]">{title}</h2>
        <span className="h-1 w-10 bg-white"></span>
      </div>
      <div className="flex justify-between items-center py-2">
        <span className="text-sm text-[#c6c4c0]">{date}</span>
        <span className="text-sm text-white">{category}</span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover group-hover:grayscale transition-all duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="mt-5 flex-col justify-between">
        <div 
          className="text-white text-xl m-0 font-thin min-h-[100px]" 
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <div className="flex justify-end">
          <span className="flex items-center gap-1">
            <span className="text-white font-semibold">CONTINUAR</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export async function Highlights() {
  const posts = await getHighlightPosts();
  console.log('Posts for Highlights section:', posts);

  if (!posts || posts.length === 0) {
    return null;
  }

  const featuredPosts: FeaturedPostProps[] = posts.map((post: WordPressPost) => ({
    title: post.title,
    date: formatDate(post.date),
    category: post.categories?.nodes[0]?.name.toUpperCase() || 'UNCATEGORIZED',
    imageUrl: post.featuredImage?.node?.sourceUrl || '/img/default-post.jpg',
    excerpt: post.excerpt || '',
    slug: post.slug
  }));

  return (
    <section>
      <div className="bg-[#161e24]">
        <div className="container mx-auto px-4 py-5">
          <h2 className="text-white text-4xl font-bold">Destacados</h2>
          <p className="text-[#ffffffbf] text-xl font-light">Procesos de diseño, tutoriales y diseño gráfico y web</p>
        </div>
      </div>
      <div className="bg-[#485354]">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.slug} {...post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/posts"
              className="flex inline-flex items-center justify-center px-8 h-[63px] border-2 rounded-md text-[20px] font-bold border-white text-white hover:bg-[#ff2c72] hover:text-white hover:border-[#ff2c72] transition-colors duration-200">
              <span>MÁS ARTÍCULOS</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 