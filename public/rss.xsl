<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> | Feed RSS</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style type="text/css">
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.5;
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
            background: #f5f5f5;
            color: #333;
          }
          header {
            background: #81adcc;
            color: white;
            padding: 2rem;
            margin: -2rem -2rem 2rem -2rem;
            text-align: center;
          }
          h1 {
            margin: 0;
            font-size: 2.5rem;
          }
          h2 {
            color: #81adcc;
          }
          .description {
            opacity: 0.8;
            margin-top: 1rem;
          }
          .meta {
            color: #666;
            font-size: 0.9rem;
          }
          article {
            background: white;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          a {
            color: #81adcc;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .categories {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-top: 1rem;
          }
          .category {
            background: #f0f7ff;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.9rem;
            color: #81adcc;
          }
        </style>
      </head>
      <body>
        <header>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <div class="description">
            <xsl:value-of select="/rss/channel/description"/>
          </div>
        </header>
        <main>
          <xsl:for-each select="/rss/channel/item">
            <article>
              <h2>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h2>
              <div class="meta">
                <span>
                  Por <xsl:value-of select="dc:creator"/>
                </span>
                <span> • </span>
                <span>
                  <xsl:value-of select="pubDate"/>
                </span>
              </div>
              <p><xsl:value-of select="description"/></p>
              <div class="categories">
                <xsl:for-each select="category">
                  <span class="category">
                    <xsl:value-of select="."/>
                  </span>
                </xsl:for-each>
              </div>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 