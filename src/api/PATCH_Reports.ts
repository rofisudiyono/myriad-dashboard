import getConfig from "next/config";
import axios from "./axiosInstance";
const { publicRuntimeConfig } = getConfig();

export const updateReports = async ({
  reportId,
  status,
}: {
  reportId: string;
  status: string;
}) => {
  return axios
    .patch(
      `reports/${reportId}`,
      {
        status: status,
        updatedAt: new Date(),
      },
      {
        headers: {
          Authorization: `Bearer ${publicRuntimeConfig.myriadDashboardApiKey}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e.response.data));
};
