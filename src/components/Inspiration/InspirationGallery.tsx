import Image from 'next/image';
import Link from 'next/link';
import { MoreButton } from '../Button/MoreButton';
import { getInspirationPosts } from '@/lib/wordpress';

interface WordPressPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author: {
    node: {
      name: string;
    };
  };
}

interface InspirationItemProps {
  imageUrl: string;
  title: string;
  author: string;
  slug: string;
}

function InspirationItem({ imageUrl, title, author, slug }: InspirationItemProps) {
  return (
    <Link href={`/posts/${slug}`} className="group bg-[#fbfaf8]">
      <div className="relative aspect-square overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover group-hover:scale-[0.95] transition-all duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <p className="text-[#161e24] text-[20px] font-light">{title}</p>
      </div>
      <div className="p-4">
        <p className="text-[#888c8d] font-light italic">— via {author}</p>
      </div>
    </Link>
  );
}

export async function InspirationGallery() {
  const posts = await getInspirationPosts();
  console.log('Posts for Inspiration section:', posts);

  if (!posts || posts.length === 0) {
    return null;
  }

  const inspirationItems: InspirationItemProps[] = posts.map((post: WordPressPost) => ({
    imageUrl: post.featuredImage?.node?.sourceUrl || '/img/default-inspiration.jpg',
    title: post.title,
    author: post.author?.node?.name || 'Anonymous',
    slug: post.slug
  }));

  return (
    <section>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center gap-3 pb-16">
          <h2 className="text-[30px] text-[#b2ada6] uppercase font-bold">Reenergise your</h2>
          <div className="relative w-full lg:w-fit lg:max-w-[768px] aspect-[3/1]">
            <Image
              src="/img/inspiration.png"
              alt="Inspiration"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 justify-start items-start gap-10">
          {inspirationItems.map((item) => (
            <InspirationItem
              key={item.slug}
              imageUrl={item.imageUrl}
              title={item.title}
              author={item.author}
              slug={item.slug}
            />
          ))}
        </div>
        <MoreButton text="MORE INSPIRATION" href="/posts/inspiration" variant="dark" />
      </div>
    </section>
  );
} 