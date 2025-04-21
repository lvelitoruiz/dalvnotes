'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';

// Importar tema y lenguajes necesarios
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';

interface CodeBlockProps {
  content: string;
}

export function CodeBlock({ content }: CodeBlockProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <div 
      className="relative p-0 bg-transparent overflow-hidden my-8
        rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)]
        before:content-[''] before:absolute before:top-0 before:left-0 
        before:w-full before:h-[40px] before:bg-[#2d2d2d] 
        before:rounded-t-lg
        after:content-[''] after:absolute after:top-[15px] after:left-5
        after:w-[10px] after:h-[10px] after:rounded-full after:bg-[#ff5f56]
        after:shadow-[20px_0_0_#ffbd2e,40px_0_0_#27c93f]"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
} 