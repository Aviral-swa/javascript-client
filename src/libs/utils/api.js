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
    if ((method === 'get') || (method === 'delete')) {
      const apiResponse = await axios[method](`${BASE_URL}${route}`, authHeader);
      return apiResponse.data;
    }
    const response = await axios[method](`${BASE_URL}${route}`, body, authHeader);
    return response.data;
  } catch (err) {
    const errorResponse = {
      message: 'Something went wrong',
    };
    if (err.message === 'Network Error') {
      return errorResponse;
    }
    const { response: { data }, response } = err;
    if (response.status === 400) {
      return errorResponse;
    }
    if (response.status === 403) {
      return data;
    }
    if (!data.response) {
      return errorResponse;
    }
    return data;
  }
};

export default callApi;
