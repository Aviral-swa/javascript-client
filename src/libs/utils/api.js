import axios from 'axios';

const callApi = async (route, method, body) => {
  try {
    const BASE_URL = 'http://localhost:9000/api';
    const authHeader = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      params: {
        skip: body.skip,
        limit: body.limit,
      },
    };
    if (method === 'get') {
      const response = await axios[method](`${BASE_URL}${route}`, authHeader);
      return response.data;
    }
    const response = await axios[method](`${BASE_URL}${route}`, body, authHeader);
    return response.data;
  } catch (err) {
    const { response: { data } } = err;
    const errorResponse = {
      message: 'Error occured',
    };
    if (!data.message) {
      return errorResponse;
    }
    return data;
  }
};

export default callApi;
