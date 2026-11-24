import { withChaiBuilder } from "@chaibuilder/core/nextjs";
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // site/ is its own app inside the library repo; don't pick up the library's lockfile or eslint config.
  outputFileTracingRoot: path.join(__dirname),
  eslint: { ignoreDuringBuilds: true },
  serverExternalPackages: ["@libsql/client", "libsql"],
  // Naju pastes image links from anywhere (Drive, Unsplash, her portfolio); serve them as-is.
  images: { unoptimized: true },
  webpack: (config) => {
    // konva (used by the editor's image tool) tries to load the native `canvas` package on the server.
    config.resolve.alias = { ...config.resolve.alias, canvas: false };
    return config;
  },
};

export default withChaiBuilder(nextConfig);
