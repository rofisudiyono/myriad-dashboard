import axios from 'axios';

const instance = axios.create({
  baseURL: `https://api.testnet.myriad.social/`,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTU0NTExZTVkZTJkOGE4MTdkYzI2NyIsIm5hbWUiOiJNeXJpYWQgT2ZmaWNpYWwiLCJ1c2VybmFtZSI6Im15cmlhZF9vZmZpY2lhbCIsInBlcm1pc3Npb25zIjpbInVzZXIiLCJhZG1pbiIsIm1hc3RlciJdfQ.R1aaKPsUh81_M_42BItgi_X7qC-nmoHz7X04PlzQn5A`,
  },
});

export default instance;
