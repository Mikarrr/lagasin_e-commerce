/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/wp/v2/:path*",
        destination: "https://panelcmslagasin.deskar.pl/wp/v2/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "panelcmslagasin.deskar.pl",
      },
    ],
  },
};

export default nextConfig;
