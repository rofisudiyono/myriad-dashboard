const { version } = require("./package.json");

const { NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_API_URL, BUILD_ID } = process.env;

/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: false,
  swcMinify: true,
  generateBuildId: async () => {
    if (BUILD_ID) {
      return BUILD_ID;
    } else {
      return version;
    }
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    myriadApiKey: NEXT_PUBLIC_API_KEY ?? "s3cReT",
    myriadApiUrl: NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  },
  images: {
    domains: ["i.pravatar.cc", "firebasestorage.googleapis.com"],
  },
};

module.exports = moduleExports;
