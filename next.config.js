/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configurações de cache
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  // Otimizações de build
  webpack: (config, { dev, isServer }) => {
    // Otimizações apenas em produção
    if (!dev && !isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
