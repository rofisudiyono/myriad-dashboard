const { version } = require("./package.json");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return version;
    }
  },

  publicRuntimeConfig: {
    myriadApiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
    myriadApiKey: process.env.NEXT_PUBLIC_API_KEY ?? "s3cReT",
  },
};

module.exports = nextConfig;
