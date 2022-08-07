import { token_api } from "../config";
import axios from "./axiosInstance";
export const deleteReports = async ({ reportId }: { reportId: string }) => {
  return axios
    .delete(`reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token_api}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e.response.data));
};
