/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "github.com",
      },
      {
        hostname: "cdn.weatherapi.com",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
