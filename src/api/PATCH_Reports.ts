import axios from './axiosInstance';
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();

export const updateReports = async ({reportId, status}: {reportId: string; status: string}) => {
  return axios
    .patch(
      `/reports/${reportId}`,
      {
        status: status,
        updatedAt: new Date(),
      },
      {
        headers: {
          Authorization: `Bearer ${publicRuntimeConfig.myriadAPIKey}`,
        },
      },
    )
    .then(response => {
      return response.data;
    })
    .catch(e => console.log(e.response.data));
};
