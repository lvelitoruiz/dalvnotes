import { GraphQLClient } from 'graphql-request';
import { WordPressPostsResponse } from '@/types/wordpress';

// Asegúrate de cambiar esta URL por la de tu WordPress con GraphQL habilitado
const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://tu-wordpress.com/graphql';

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ejemplo de consulta para posts
export const getAllPosts = async (): Promise<WordPressPostsResponse> => {
  const query = `
    query AllPosts {
      posts {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request<WordPressPostsResponse>(query);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}; 