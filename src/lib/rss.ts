import { getPosts } from './wordpress';

interface WordPressPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  author?: {
    node: {
      name: string;
    };
  };
}

interface WordPressCategory {
  name: string;
  slug: string;
}

interface RSSItem {
  title: string;
  description: string;
  url: string;
  date: string;
  author: string;
  categories?: string[];
}

function generateRSSXML(items: RSSItem[], title: string, description: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rmx.com';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/rss.xsl" type="text/xsl"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${title}</title>
    <link>${baseUrl}</link>
    <description>${description}</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items.map(item => `
      <item>
        <title><![CDATA[${item.title}]]></title>
        <link>${baseUrl}/post/${item.url}</link>
        <guid isPermaLink="false">${baseUrl}/post/${item.url}</guid>
        <description><![CDATA[${item.description}]]></description>
        <pubDate>${new Date(item.date).toUTCString()}</pubDate>
        ${item.author ? `<dc:creator><![CDATA[${item.author}]]></dc:creator>` : ''}
        ${item.categories ? item.categories.map(category => 
          `<category><![CDATA[${category}]]></category>`
        ).join('') : ''}
      </item>
    `).join('')}
  </channel>
</rss>`;
}

export async function generateCategoryRSS(category?: string) {
  const posts = await getPosts(category);
  
  if (!posts) return '';

  const items: RSSItem[] = posts.map((post: WordPressPost) => ({
    title: post.title,
    description: post.excerpt || '',
    url: post.slug,
    date: post.date,
    author: post.author?.node?.name || 'Anonymous',
    categories: post.categories?.nodes.map((cat: WordPressCategory) => cat.name) || []
  }));

  const title = category 
    ? `RMX Blog - ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : 'RMX Blog';
    
  const description = category
    ? `Artículos sobre ${category.toLowerCase()} en RMX Blog`
    : 'Todos los artículos de RMX Blog';

  return generateRSSXML(items, title, description);
} 