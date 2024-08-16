/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/profile',
        destination: '/sign-in',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: '__session',
            value: '^(?!.*)$', // Redirect if no session cookie
          },
        ],
      },
    ];
  },
};

export default nextConfig;