// eslint-disable-next-line @typescript-eslint/no-var-requires
const {version} = require('./package.json');

/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: false,
  swcMinify: true,
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return version;
    }
  },
  serverRuntimeConfig: {
    appAuthURL: process.env.NEXT_PUBLIC_APP_AUTH_URL ?? 'http://localhost:3000',
    myriadAPIURL: process.env.NEXT_PUBLIC_MYRIAD_API_URL ?? 'http://localhost:3001',
    myriadAPIKey: process.env.NEXT_PUBLIC_MYRIAD_API_KEY ?? 's3cReT',
  },
  publicRuntimeConfig: {
    appAuthURL: process.env.NEXT_PUBLIC_APP_AUTH_URL ?? 'http://localhost:3000',
    myriadAPIURL: process.env.NEXT_PUBLIC_MYRIAD_API_URL ?? 'http://localhost:3001',
    myriadAPIKey: process.env.NEXT_PUBLIC_MYRIAD_API_KEY ?? 's3cReT',
  },
  images: {
    domains: ['i.pravatar.cc', 'firebasestorage.googleapis.com'],
  },
};

module.exports = moduleExports;
