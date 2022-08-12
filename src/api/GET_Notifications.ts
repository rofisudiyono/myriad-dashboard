import axios from './axiosInstance';

export const getNotifications = async () => {
  return axios
    .get(`/notifications`)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
};
