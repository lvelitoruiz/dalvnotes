import { FeaturedPostGrid } from './FeaturedPostGrid';
import { RecommendedPosts } from './RecommendedPosts';
import Link from 'next/link';

export function PostsSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <FeaturedPostGrid />
        </div>
        <div className="lg:col-span-1">
          <RecommendedPosts />
        </div>
      </div>
      <div className="text-center mt-12">
        <Link
          href="/posts"
          className="inline-flex items-center justify-center px-8 h-[63px] border-2 rounded-md text-[20px] font-bold border-[#161e24] text-[#161e24] hover:bg-[#ff2c72] hover:text-white hover:border-[#ff2c72] transition-colors duration-200"
        >
          <span>MÁS ARTÍCULOS</span>
        </Link>
      </div>
    </section>
  );
} 