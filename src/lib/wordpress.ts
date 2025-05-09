const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function getFeaturedPosts() {
  try {    
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query RecentPosts {
            posts(first: 2, where: { orderby: { field: DATE, order: DESC } }) {
              nodes {
                id
                databaseId
                title
                slug
                excerpt
                date
                modified
                link
                status
                categories {
                  nodes {
                    id
                    name
                    slug
                    description
                  }
                }
                featuredImage {
                  node {
                    id
                    sourceUrl
                    altText
                    title
                    description
                    caption
                  }
                }
                author {
                  node {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
        `,
      }),
    });

    if (!res.ok) {
      console.error('WordPress API Error:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();

    if (json.errors) {
      console.error('WordPress GraphQL Error:', json.errors);
      return [];
    }

    const posts = json.data?.posts?.nodes || [];
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getHeaderCategories() {
  try {
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query HeaderCategories {
            categories {
              nodes {
                id
                name
                slug
                uri
                count
              }
            }
          }
        `,
      }),
    });

    if (!res.ok) {
      console.error('WordPress API Error:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();

    if (json.errors) {
      console.error('WordPress GraphQL Error:', json.errors);
      return [];
    }

    return json.data.categories.nodes;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getRecommendedPosts() {
  try {
    console.log('Fetching recommended posts from WordPress API');
    
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query RecommendedPosts {
            posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
              nodes {
                id
                title
                date
                slug
                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          }
        `,
      }),
    });

    if (!res.ok) {
      console.error('WordPress API Error:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();
    console.log('WordPress API Response for recommended posts:', json);

    if (json.errors) {
      console.error('WordPress GraphQL Error:', json.errors);
      return [];
    }

    const posts = json.data?.posts?.nodes || [];
    console.log('Processed recommended posts:', posts);
    
    return posts;
  } catch (error) {
    console.error('Error fetching recommended posts:', error);
    return [];
  }
}

export async function getHighlightPosts() {
  try {
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query HighlightPosts {
            posts(first: 3, where: { 
              orderby: { field: DATE, order: DESC },
              tag: "highlight"
            }) {
              nodes {
                id
                title
                date
                excerpt
                slug
                categories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        `,
      }),
    });

    if (!res.ok) {
      console.error('WordPress API Error:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();

    if (json.errors) {
      console.error('WordPress GraphQL Error:', json.errors);
      return [];
    }

    const posts = json.data?.posts?.nodes || [];
    return posts;
  } catch (error) {
    console.error('Error fetching highlight posts:', error);
    return [];
  }
}

export async function getInspirationPosts() {
  try {
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query InspirationPosts {
            posts(first: 4, where: { 
              orderby: { field: DATE, order: DESC },
              categoryName: "inspiration"
            }) {
              nodes {
                id
                title
                slug
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                author {
                  node {
                    name
                  }
                }
              }
            }
          }
        `,
      }),
    });

    if (!res.ok) {
      console.error('WordPress API Error:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();

    if (json.errors) {
      console.error('WordPress GraphQL Error:', json.errors);
      return [];
    }

    const posts = json.data?.posts?.nodes || [];
    return posts;
  } catch (error) {
    console.error('Error fetching inspiration posts:', error);
    return [];
  }
}

export async function getPosts(category?: string) {
  try {
    const query = category ? `
      query GetPostsByCategory($category: String!) {
        posts(
          first: 50,
          where: { 
            orderby: { field: DATE, order: DESC }
            categoryName: $category
          }
        ) {
          nodes {
            id
            title
            date
            excerpt
            slug
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    ` : `
      query GetAllPosts {
        posts(
          first: 50,
          where: { 
            orderby: { field: DATE, order: DESC }
          }
        ) {
          nodes {
            id
            title
            date
            excerpt
            slug
            categories {
              nodes {
                name
                slug
              }
            }
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
    
    const variables = category ? { category } : undefined;
    
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      }),
    });

    if (!res.ok) {
      console.error('WordPress API Error:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();

    if (json.errors) {
      console.error('WordPress GraphQL Error:', json.errors);
      return [];
    }

    const posts = json.data?.posts?.nodes || [];
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query SearchPosts($searchTerm: String!) {
            posts(
              first: 50,
              where: { 
                search: $searchTerm,
                orderby: { field: DATE, order: DESC }
              }
            ) {
              nodes {
                id
                title
                date
                excerpt
                slug
                categories {
                  nodes {
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        `,
        variables: { searchTerm }
      }),
    });

    if (!res.ok) {
      console.error('WordPress API Error:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();

    if (json.errors) {
      console.error('WordPress GraphQL Error:', json.errors);
      return [];
    }

    const posts = json.data?.posts?.nodes || [];
    return posts;
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetPost($slug: ID!) {
            post(id: $slug, idType: SLUG) {
              id
              title
              date
              content
              excerpt
              slug
              categories {
                nodes {
                  name
                  slug
                }
              }
              tags {
                nodes {
                  name
                  slug
                }
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              author {
                node {
                  name
                }
              }
            }
          }
        `,
        variables: { slug }
      }),
    });

    if (!res.ok) {
      console.error('WordPress API Error:', res.status, res.statusText);
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      console.error('WordPress GraphQL Error:', json.errors);
      return null;
    }

    return json.data?.post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function testGraphQLSchema() {
  try {
    const response = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query IntrospectionQuery {
            __schema {
              types {
                name
                description
              }
              mutationType {
                fields {
                  name
                  description
                  args {
                    name
                    type {
                      name
                    }
                  }
                }
              }
            }
          }
        `
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error testing GraphQL schema:', error);
    return null;
  }
}

export async function getPostsByTag(tag?: string) {
  try {
    const query = tag ? `
      query GetPostsByTag($tag: String!) {
        posts(
          first: 50,
          where: { 
            orderby: { field: DATE, order: DESC }
            tag: $tag
          }
        ) {
          nodes {
            id
            title
            date
            excerpt
            slug
            categories {
              nodes {
                name
                slug
              }
            }
            tags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    ` : `
      query GetAllPosts {
        posts(
          first: 50,
          where: { 
            orderby: { field: DATE, order: DESC }
          }
        ) {
          nodes {
            id
            title
            date
            excerpt
            slug
            categories {
              nodes {
                name
                slug
              }
            }
            tags {
              nodes {
                name
                slug
              }
            }
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
    
    const variables = tag ? { tag } : undefined;
    
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      }),
    });

    if (!res.ok) {
      console.error('WordPress API Error:', res.status, res.statusText);
      return [];
    }

    const json = await res.json();

    if (json.errors) {
      console.error('WordPress GraphQL Error:', json.errors);
      return [];
    }

    const posts = json.data?.posts?.nodes || [];
    return posts;
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
} 