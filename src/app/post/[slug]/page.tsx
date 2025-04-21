import { PostHeader } from '@/components/Post/PostHeader';
import { PostContent } from '@/components/Post/PostContent';
import { PostTags } from '@/components/Post/PostTags';
import { Newsletter } from '@/components/Newsletter/Newsletter';
import { getPostBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-20">
      <PostHeader 
        title={post.title}
        date={post.date}
        category={post.categories?.nodes[0]?.name || 'Uncategorized'}
        author={post.author?.node?.name || 'Anonymous'}
        featuredImage={post.featuredImage?.node}
      />
      <PostContent content={post.content} />
      {post.tags?.nodes && post.tags.nodes.length > 0 && (
        <PostTags tags={post.tags.nodes} />
      )}
      <Newsletter />
    </article>
  );
} 