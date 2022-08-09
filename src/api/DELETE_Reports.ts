import getConfig from "next/config";
import axios from "./axiosInstance";
const { publicRuntimeConfig } = getConfig();

export const deleteReports = async ({ reportId }: { reportId: string }) => {
  return axios
    .delete(`/reports/${reportId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e.response.data));
};
