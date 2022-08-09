import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
console.log(">>>", publicRuntimeConfig);

const instance = axios.create({
  baseURL: publicRuntimeConfig.myriadApiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${publicRuntimeConfig.myriadApiKey}`,
  },
});

export default instance;
