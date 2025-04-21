import Link from 'next/link';

interface Tag {
  name: string;
  slug: string;
}

interface PostTagsProps {
  tags: Tag[];
}

export const PostTags = ({ tags }: PostTagsProps) => {
  return (
    <div className="flex items-center flex-wrap justify-center gap-5">
      {tags.map((tag, index) => (
        <Link
          key={index}
          href={`/tag/${tag.slug}`}
          className="uppercase px-5 py-2 rounded-full bg-[#fe538c1a] text-xs text-[#ff5a91] font-semibold hover:text-[#ff2c72]"
        >
          <span>{tag.name}</span>
        </Link>
      ))}
    </div>
  );
}; 