import { PostHeader } from '@/components/Post/PostHeader';
import { PostContent } from '@/components/Post/PostContent';
import { PostTags } from '@/components/Post/PostTags';
import { Newsletter } from '@/components/Newsletter/Newsletter';
import { getPostBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full">
      <PostHeader 
        title={post.title}
        date={post.date}
        category={post.categories?.nodes[0]?.name || 'Uncategorized'}
        author={post.author?.node?.name || 'Anonymous'}
        featuredImage={post.featuredImage?.node}
      />
      <div className="container mx-auto px-4">
        <PostContent content={post.content} />
        {post.tags?.nodes && post.tags.nodes.length > 0 && (
          <PostTags tags={post.tags.nodes} />
        )}
        <Newsletter />
      </div>
    </article>
  );
} 