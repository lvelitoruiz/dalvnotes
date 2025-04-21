'use client';

import { useEffect, useCallback } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

export function PrismInitializer() {
  const highlight = useCallback(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  useEffect(() => {
    // Initial highlight with a small delay to ensure content is loaded
    const timer = setTimeout(highlight, 0);

    // Set up observer for content changes
    const observer = new MutationObserver((mutations) => {
      const hasCodeBlocks = mutations.some(mutation => 
        Array.from(mutation.addedNodes).some(node => 
          node instanceof HTMLElement && 
          (node.querySelector('pre') || node.querySelector('code'))
        )
      );

      if (hasCodeBlocks) {
        highlight();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [highlight]);

  return null;
} 