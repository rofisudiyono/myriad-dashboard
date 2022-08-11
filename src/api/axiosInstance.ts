import axios from 'axios';
import getConfig from 'next/config';

const {serverRuntimeConfig} = getConfig();

const instance = axios.create({
  baseURL: `${serverRuntimeConfig.myriadAPIURL}`,
  headers: {
    Authorization: `Bearer ${serverRuntimeConfig.myriadAPIKey}`,
  },
});

export default instance;
