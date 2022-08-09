import type { NextApiRequest, NextApiResponse } from "next";

import httpProxyMiddleware from "next-http-proxy-middleware";
import getConfig from "next/config";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let headers = {};
  try {
    headers = {
      Authorization: `Bearer ${publicRuntimeConfig.myriadApiKey}`,
    };
    console.log("server ==>", serverRuntimeConfig);

    return httpProxyMiddleware(req, res, {
      target: publicRuntimeConfig.myriadAPIURL,
      pathRewrite: [
        {
          patternStr: "/api",
          replaceStr: "",
        },
      ],
      changeOrigin: true,
      headers,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: e });
  }
}
