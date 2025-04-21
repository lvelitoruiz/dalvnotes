interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  return (
    <article className="container mx-auto px-4 py-10">
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}; 