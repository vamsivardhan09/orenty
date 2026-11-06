import { MetadataRoute } from 'next';
import { siteContent, challengesList } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://orenty.in';
  const lastModified = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = siteContent.products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const careerRoutes: MetadataRoute.Sitemap = challengesList.map((c) => ({
    url: `${baseUrl}/careers/${c.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...coreRoutes, ...productRoutes, ...careerRoutes];
}
