import getConfig from "next/config";
import axios from "./axiosInstance";

export const getHealtcheck = async () => {
  return axios
    .get(`/health`)
    .then(() => {
      return true;
    })
    .catch((e) => {
      return false;
    });
};
