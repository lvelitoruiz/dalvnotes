import { WordPressPost } from '@/types/wordpress';
import Image from 'next/image';
import Link from 'next/link';

export interface PostCardProps {
  post: WordPressPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="border rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      {post.featuredImage?.node && (
        <div className="relative h-48 w-full">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3">{post.title}</h2>
        <div 
          className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <Link 
            href={`/post/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Leer más →
          </Link>
        </div>
      </div>
    </article>
  );
} 