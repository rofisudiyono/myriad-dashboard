import axios from './axiosInstance';

export const deleteReports = async ({reportId}: {reportId: string}) => {
  return axios
    .delete(`/api/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTU0NTExZTVkZTJkOGE4MTdkYzI2NyIsIm5hbWUiOiJNeXJpYWQgT2ZmaWNpYWwiLCJ1c2VybmFtZSI6Im15cmlhZF9vZmZpY2lhbCIsImNyZWF0ZWRBdCI6IjIwMjEtMTItMThUMjA6NDQ6MDQuMzI3WiIsInBlcm1pc3Npb25zIjpbIm1hc3RlciIsImFkbWluIiwidXNlciJdfQ.Zacem4noTZlkX4mihp67ixcr8ZzksiA8t8u7l1qpmyM`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(e => console.log(e.response.data));
};
