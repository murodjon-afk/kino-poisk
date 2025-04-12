import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};


module.exports = {
  images: {
    domains: ['image.tmdb.org'], 
  },
}
export default nextConfig;
