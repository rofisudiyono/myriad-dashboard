import { token_api } from "../config";
import axios from "./axiosInstance";

export const getAllUser = async ({
  pageNumber,
  filter,
}: {
  pageNumber: number;
  filter: string;
}) => {
  return axios
    .get(`reports?pageNumber=${pageNumber}&filter=${filter}`, {})
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e.response.data));
};

export const updateUserStatus = async ({
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

export const deleteUser = async ({ reportId }: { reportId: string }) => {
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
