import { token_api } from "../config";
import axios from "./axiosInstance";
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
          Authorization: `Bearer ${token_api}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e.response.data));
};
