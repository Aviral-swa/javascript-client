import axios from 'axios';

const callApi = async (route, method, body) => {
  try {
    const BASE_URL = 'http://localhost:9000/api';
    const authHeader = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    if (method === 'get') {
      const response = await axios[method](`${BASE_URL}${route}`, authHeader);
      return response.data;
    }
    const response = await axios[method](`${BASE_URL}${route}`, body, authHeader);
    return response.data;
  } catch (err) {
    return err;
  }
};

export default callApi;
