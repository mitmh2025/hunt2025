import { type RequestHandler } from "express";

const robotsTxt = `
User-agent: Amazonbot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: AwarioRssBot
User-agent: AwarioSmartBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: DataForSeoBot
Disallow: /

User-agent: Diffbot
Disallow: /

User-agent: FacebookBot
Disallow: /

User-agent: FriendlyCrawler
Disallow: /

User-agent: Google-CloudVertexBot
Disallow: /
Allow: /wirecutter/

User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ImagesiftBot
Disallow: /

User-agent: magpie-crawler
Disallow: /

User-agent: Meta-ExternalAgent
User-agent: meta-externalagent
Disallow: /

User-agent: NewsNow
Disallow: /

User-agent: news-please
Disallow: /

User-agent: OAI-SearchBot
Disallow: /

User-agent: omgili
Disallow: /

User-agent: omgilibot
Disallow: /

User-agent: peer39_crawler
User-agent: peer39_crawler/1.0
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Quora-Bot
Disallow: /

User-agent: Scrapy
Disallow: /

User-agent: TurnitinBot
Disallow: /
`.trim();

export const robotsHandler: RequestHandler = (_, res) => {
  res.type("text/plain");
  res.send(robotsTxt);
};
