import axios from './axiosInstance';

export const getNotifications = async (filter: any) => {
  return axios
    .get(`/notifications`, {
      params: {
        filter,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
};
