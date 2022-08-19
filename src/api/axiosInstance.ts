import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.testnet.myriad.social',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
