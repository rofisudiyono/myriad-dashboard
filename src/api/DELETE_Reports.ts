import axios from './axiosInstance';
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();

export const deleteReports = async ({reportId}: {reportId: string}) => {
  return axios
    .delete(`/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${publicRuntimeConfig.myriadAPIKey}`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(e => console.log(e.response.data));
};
