import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The design-taste-frontend skill reaches for these two hosts for
    // placeholder photography and logo walls. next/image returns 400 for any
    // host that is not listed here, so without these the skill's first output
    // breaks. Delete both once you have real assets.
    remotePatterns: [
      new URL("https://picsum.photos/**"),
      new URL("https://cdn.simpleicons.org/**"),
    ],
    // Cost control: transformations and cache writes bill on every cache miss.
    // 31 days, and one format instead of avif+webp.
    // https://vercel.com/docs/image-optimization/managing-image-optimization-costs
    minimumCacheTTL: 2678400,
    formats: ["image/webp"],
  },
};

export default nextConfig;
