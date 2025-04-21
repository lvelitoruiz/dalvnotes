import Image from 'next/image';

interface PostHeaderProps {
  title: string;
  date: string;
  category: string;
  author: string;
  featuredImage?: {
    sourceUrl: string;
    altText?: string;
  };
}

export const PostHeader = ({ title, date, category, author, featuredImage }: PostHeaderProps) => {
  return (
    <section>
      {featuredImage && (
        <div className="relative w-full h-[500px]">
          <Image
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText || title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="bg-white px-4 lg:py-20 py-10 mt-[-100px] relative">
          <h1 className="text-center text-[#81adcc] text-[36px] lg:text-[70px] uppercase leading-none font-bold">{title}</h1>
          <div className="text-center text-[#00000059] font-bold lg:pt-8 pt-4 uppercase flex items-center justify-center gap-4">
            <span>{category}</span>
            <span>•</span>
            <time>{date}</time>
            <span>•</span>
            <span>by {author}</span>
          </div>
        </div>
      </div>
    </section>
  );
}; 