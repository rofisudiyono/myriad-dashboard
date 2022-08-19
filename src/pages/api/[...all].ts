import type {NextApiRequest, NextApiResponse} from 'next';
import getConfig from 'next/config';
import httpProxyMiddleware from 'next-http-proxy-middleware';

const {serverRuntimeConfig} = getConfig();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return httpProxyMiddleware(req, res, {
      target: `${serverRuntimeConfig.myriadAPIURL}`,
      pathRewrite: [
        {
          patternStr: '/api',
          replaceStr: '',
        },
      ],
      changeOrigin: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({error: e});
  }
}
