import axios from 'axios';

const callApi = async (route, method, body) => {
  try {
    const BASE_URL = 'http://localhost:9000/api/user';
    const response = await axios[method](`${BASE_URL}${route}`, body);
    return response.data.data;
  } catch (err) {
    return err.message;
  }
};

export default callApi;
