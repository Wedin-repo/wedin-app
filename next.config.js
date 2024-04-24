const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Set fallback for non-Node built-in modules
      config.resolve.fallback = {
        fs: false,
        dns: false,
        tls: false,
        child_process: false,
        // Add other Node.js modules that you want to exclude here
      };
    }
    // Continue with your existing webpack config
    return config;
  },
  images: {
    domains: [
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'scontent.fasu11-2.fna.fbcdn.net',
      'loremflickr.com',
      'picsum.photos',
      // Add other domains you want to allow here
    ],
  },
  // Add other Next.js config options here if needed
};

module.exports = nextConfig;
