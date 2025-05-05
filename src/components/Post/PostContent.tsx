'use client';

import { useEffect, useRef } from 'react';

interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Encontrar todas las tablas y envolverlas en un div con la clase table-container
    const tables = contentRef.current.getElementsByTagName('table');
    for (let i = tables.length - 1; i >= 0; i--) {
      const table = tables[i];
      const wrapper = document.createElement('div');
      wrapper.className = 'table-container';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  }, [content]);

  return (
    <div className="container mx-auto px-4 py-10 max-w-[960px]">
      <div 
        ref={contentRef}
        className="prose prose-lg max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
}; 