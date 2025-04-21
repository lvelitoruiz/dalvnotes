import Image from 'next/image';
import Link from 'next/link';

interface FeaturedPostProps {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  color?: string;
  slug: string;
}

export function FeaturedPost({ 
  title, 
  date, 
  category, 
  excerpt, 
  imageUrl,
  color = '#7e4b71',
  slug
}: FeaturedPostProps) {
  // Limpiar el HTML del excerpt
  const cleanExcerpt = excerpt.replace(/<[^>]*>/g, '');

  return (
    <Link href={`/post/${slug}`} className="group block">
      <div className="flex flex-col gap-2 mb-5">
        <h2 
          className="text-[32px] leading-none font-semibold h-[94px]"
          style={{ color }}
        >
          {title}
        </h2>
        <span className="h-1 w-10" style={{ backgroundColor: color }}></span>
      </div>
      <div className="flex justify-between items-center py-2">
        <span className="text-sm text-[#c6c4c0]">{date}</span>
        <span className="text-sm uppercase" style={{ color }}>{category}</span>
      </div>
      <div className="relative w-full aspect-[16/9]">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover group-hover:grayscale transition-all duration-300"
          sizes="100vw"
          priority
        />
      </div>
      <div className="mt-5 flex-col justify-between">
        <p className="text-[#161e24] text-xl m-0 font-thin min-h-[100px]">
          {cleanExcerpt}
        </p>
        <div className="flex justify-end">
          <span className="flex items-center gap-1">
            <span className="font-semibold uppercase" style={{ color }}>CONTINUE</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ color }}
            >
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
} 