/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // optimize package imports for smaller bundle sizes
    optimizePackageImports: ['lucide-react', 'clsx', 'tailwind-merge', 'three'],
  },
};

export default nextConfig;
