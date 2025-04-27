interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-[960px]">
      <div 
        className="prose prose-lg max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
}; 