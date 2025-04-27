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

  const setupCodeBlocks = useCallback(() => {
    // Buscar todos los elementos pre que no estén ya envueltos
    const preElements = document.querySelectorAll('pre:not(.code-block-wrapper pre)');
    
    preElements.forEach(pre => {
      if (!pre.parentElement?.classList.contains('code-block-wrapper')) {
        // Crear el wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        
        // Crear la barra superior
        const header = document.createElement('div');
        header.className = 'code-header';
        
        // Crear el botón de copiar
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.type = 'button';
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          <span>Copiar</span>
        `;
        
        // Agregar el evento de click al botón
        copyButton.addEventListener('click', async (e) => {
          e.stopPropagation();
          try {
            await navigator.clipboard.writeText(pre.textContent || '');
            const span = copyButton.querySelector('span');
            if (span) {
              const originalText = span.textContent;
              span.textContent = '¡Copiado!';
              copyButton.style.color = 'rgba(255, 255, 255, 0.9)';
              setTimeout(() => {
                span.textContent = originalText;
                copyButton.style.color = '';
              }, 2000);
            }
          } catch (err) {
            console.error('Error al copiar el código:', err);
          }
        });

        // Ensamblar la estructura
        header.appendChild(copyButton);
        wrapper.appendChild(header);
        
        // Mover el pre al wrapper
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
      }
    });
  }, []);

  useEffect(() => {
    // Initial highlight with a small delay to ensure content is loaded
    const timer = setTimeout(() => {
      highlight();
      setupCodeBlocks();
    }, 0);

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
        setupCodeBlocks();
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
  }, [highlight, setupCodeBlocks]);

  return null;
} 