import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-work-sans)', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',
        foreground: '#161e24',
        primary: '#7e4b71',
        secondary: '#81adcc',
        accent: '#FF80AA',
        muted: '#c6c4c0',
        surface: '#fbfaf8',
      },
      typography: {
        DEFAULT: {
          css: {
            'h1, h2, h3, h4': {
              color: '#81adcc',
              fontWeight: '700',
            },
            'h1': {
              fontSize: '2.25rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            'h2': {
              fontSize: '1.875rem',
              marginTop: '2.5rem',
              marginBottom: '1rem',
            },
            'p': {
              color: '#6f6f6f',
            },
            'ul': {
              color: '#6f6f6f',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.625rem',
              li: {
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
              },
            },
            'pre': {
              backgroundColor: '#1e1e1e',
              color: '#e2e8f0',
              padding: '2.5rem 1rem 1rem',
              borderRadius: '0.75rem',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              position: 'relative',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              // '&::before': {
              //   content: '""',
              //   position: 'absolute',
              //   top: '0.875rem',
              //   left: '1rem',
              //   width: '0.75rem',
              //   height: '0.75rem',
              //   backgroundColor: '#ff5f56',
              //   borderRadius: '50%',
              //   boxShadow: '1.4rem 0 0 #ffbd2e, 2.8rem 0 0 #27c93f',
              // },
              code: {
                backgroundColor: 'transparent',
                padding: '0',
                color: 'inherit',
                fontSize: '0.875rem',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                whiteSpace: 'pre',
                '&::before': {
                  display: 'none',
                },
                '&::after': {
                  display: 'none',
                },
              },
            },
            'code': {
              backgroundColor: '#f1f5f9',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              '&::before': {
                display: 'none',
              },
              '&::after': {
                display: 'none',
              },
            },
            'img': {
              borderRadius: '14px',
              marginTop: '2rem',
              marginBottom: '2rem',
              border: '10px solid #81adcc',
              overflow: 'hidden',
              maxWidth: '100%',
              height: 'auto',
            },
            'a': {
              color: '#81adcc',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            // Estilos para videos
            'iframe, video': {
              width: '100%',
              maxWidth: '90%',
              margin: '2rem auto',
              display: 'block',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            // Estilos para tablas
            '.table-container': {
              width: '100%',
              overflowX: 'auto',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f5f9',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#81adcc',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#7e4b71',
                },
              },
            },
            'table': {
              minWidth: '600px',
              borderCollapse: 'collapse',
              wordBreak: 'break-word',
            },
            'thead': {
              borderBottom: '2px solid #81adcc',
            },
            'th': {
              padding: '0.75rem',
              textAlign: 'left',
              color: '#81adcc',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              '&[data-col-size="sm"]': {
                width: '15%',
              },
              '&[data-col-size="md"]': {
                width: '25%',
              },
            },
            'td': {
              padding: '0.75rem',
              borderBottom: '1px solid #e2e8f0',
              whiteSpace: 'nowrap',
              '&[data-col-size="sm"]': {
                width: '15%',
              },
              '&[data-col-size="md"]': {
                width: '25%',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}

export default config 