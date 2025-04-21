'use client';

import Link from 'next/link';

interface RecommendedPostProps {
  number: number;
  title: string;
  date: string;
  color: string;
  slug: string;
}

export function RecommendedPost({ number, title, date, color, slug }: RecommendedPostProps) {
  return (
    <div className="flex items-start gap-4 bg-[#fbfaf8] p-4">
      <span className="text-4xl font-bold" style={{ color }}>
        {number}
      </span>
      <div className="flex flex-col gap-1">
        <Link 
          href={`/posts/${slug}`}
          className="leading-none text-[#161e24] font-light text-[20px] hover:text-[#81adcc] transition-colors duration-200"
          style={{ 
            '--hover-color': color,
          } as React.CSSProperties}
          onMouseEnter={e => (e.currentTarget.style.color = color)}
          onMouseLeave={e => (e.currentTarget.style.color = '#161e24')}
        >
          {title}
        </Link>
        <span className="text-xs text-[#c6c4c0] font-semibold">
          {date}
        </span>
      </div>
    </div>
  );
} 