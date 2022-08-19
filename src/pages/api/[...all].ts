import type {NextApiRequest, NextApiResponse} from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return httpProxyMiddleware(req, res, {
      target: `https://api.testnet.myriad.social`,
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
