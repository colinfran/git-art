export default {
  reactStrictMode: false,
  devIndicators: {

  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
    ],
  }
};
