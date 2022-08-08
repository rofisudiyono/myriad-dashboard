import axios from "axios";
import getConfig from "next/config";
// import { testnetBaseUrl } from "../config";
const { publicRuntimeConfig } = getConfig();

const instance = axios.create({
  baseURL: publicRuntimeConfig.myriadApiUrl,
  headers: { "Content-Type": "application/json" },
});

export default instance;
