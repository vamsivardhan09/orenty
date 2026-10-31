import { MetadataRoute } from 'next';
import { siteContent } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://orenty.in';
  const lastModified = new Date();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/software`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lab`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic product routes
  const productRoutes: MetadataRoute.Sitemap = siteContent.products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
