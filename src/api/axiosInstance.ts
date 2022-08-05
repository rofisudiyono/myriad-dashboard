import axios from "axios";
import { testnetBaseUrl } from "../config";

const instance = axios.create({
  baseURL: testnetBaseUrl,
  headers: { "Content-Type": "application/json" },
});

export default instance;
