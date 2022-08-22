// eslint-disable-next-line @typescript-eslint/no-var-requires
const {version} = require('./package.json');

/** @type {import('next').NextConfig} */

const {NEXT_PUBLIC_APP_AUTH_URL, NEXT_PUBLIC_MYRIAD_API_URL, MYRIAD_API_KEY} = process.env;

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
    myriadAPIKey: MYRIAD_API_KEY,
    myriadAPIURL: NEXT_PUBLIC_MYRIAD_API_URL,
  },
  publicRuntimeConfig: {
    appAuthURL: NEXT_PUBLIC_APP_AUTH_URL,
  },
  images: {
    domains: ['i.pravatar.cc', 'firebasestorage.googleapis.com'],
  },
};

module.exports = moduleExports;
