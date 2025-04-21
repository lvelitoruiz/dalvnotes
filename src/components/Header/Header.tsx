import Link from 'next/link';
import { GraduationCap, Pencil, Lightbulb, Search } from 'lucide-react';
import { getHeaderCategories } from '@/lib/wordpress';

interface Category {
  id: string;
  name: string;
  slug: string;
}

const categoryStyles: Record<string, { text: string; hover: string }> = {
  tutorial: {
    text: 'text-[#786596]',
    hover: 'hover:bg-[#786596]'
  },
  articles: {
    text: 'text-[#161e24]',
    hover: 'hover:bg-[#161e24]'
  },
  inspiration: {
    text: 'text-[#ff5a91]',
    hover: 'hover:bg-[#ff5a91]'
  }
};

export async function Header() {
  const categories = await getHeaderCategories();

  return (
    <header>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link className="flex items-center justify-center h-[64px] w-[64px] bg-[#F6F2EE]" href="/">
              <span>X</span>
            </Link>
            <nav>
              <ul className="flex items-center">
                {categories.map((category: Category) => {
                  const styles = categoryStyles[category.slug] || categoryStyles.articles;
                  return (
                    <li key={category.id}>
                      <Link
                        className={`h-[64px] flex items-center justify-center gap-2 px-4 font-bold ${styles.text} ${styles.hover} hover:text-white transition-colors duration-200`}
                        href={`/posts/${category.slug}`}
                      >
                        {category.slug === 'tutorial' && <GraduationCap className="w-5 h-5" />}
                        {category.slug === 'articles' && <Pencil className="w-5 h-5" />}
                        {category.slug === 'inspiration' && <Lightbulb className="w-5 h-5" />}
                        <span className="hidden lg:block">{category.name.toUpperCase()}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <Link 
            className="flex items-center justify-center h-[64px] w-[64px] hover:bg-[#161e24] hover:text-white transition-colors duration-200" 
            href="/search"
          >
            <Search className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
} 