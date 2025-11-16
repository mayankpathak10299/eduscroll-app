// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use a type assertion 'as any' to bypass the conflict in Next.js's type definitions.
  // This allows us to use the 'buildActivity: false' property which works at runtime.
  devIndicators: {
    buildActivity: false,
  } as any, 
  /* config options here */
};

export default nextConfig;