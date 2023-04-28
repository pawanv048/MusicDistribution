import axios from "axios";

export const baseUrl = 'http://84.16.239.66/api/';
export const trackUrl = 'https://musicdistributionsystem.com/tracks/';

export const API = async ({ url, params, method, headers, onSuccess, onError }) => {
  let defaultHeaders = {
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers || defaultHeaders,
      data: params,
    });
    onSuccess(response.data);
  } catch (err) {
    console.log(err);
    onError(err);
  }
};


const apiServers = { API }

export default apiServers;
