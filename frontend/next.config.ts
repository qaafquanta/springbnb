import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      new URL(`https://res.cloudinary.com/dvfuxopef/image/upload/**`),
    ],
  },
};

export default nextConfig;
