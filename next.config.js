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
    myriadDashboardApiUrl: process.env.NEXT_PUBLIC_DASHBOARD_API_URL,
    myriadDashboardApiKey: process.env.NEXT_PUBLIC_DASHBOARD_API_KEY,
  },
};

module.exports = nextConfig;
