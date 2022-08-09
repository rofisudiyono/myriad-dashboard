import getConfig from "next/config";
import axios from "./axiosInstance";
const { publicRuntimeConfig } = getConfig();

console.log(publicRuntimeConfig.myriadApiKey);
export const updateReports = async ({
  reportId,
  status,
}: {
  reportId: string;
  status: string;
}) => {
  return axios
    .patch(`/reports/${reportId}`, {
      status: status,
      updatedAt: new Date(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e.response.data));
};
