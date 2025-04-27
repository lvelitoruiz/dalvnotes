'use client';

import { useEffect, useState } from 'react';
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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const handleCopy = async () => {
    // Extraer el texto del contenido HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const codeText = tempDiv.textContent || tempDiv.innerText;

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar el código:', err);
    }
  };

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
    >
      <button
        onClick={handleCopy}
        className="absolute top-2 right-4 text-white/70 hover:text-white transition-colors duration-200 z-10 flex items-center gap-2"
        title="Copiar código"
      >
        {copied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <span className="text-sm">¡Copiado!</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
            <span className="text-sm">Copiar</span>
          </>
        )}
      </button>
      <div 
        className="relative"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
} 