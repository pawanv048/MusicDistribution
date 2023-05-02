import axios from "axios";

export const url = 'http://84.16.239.66/api/';
export const baseUrl = 'https://musicdistributionsystem.com';
export const trackUrl = 'https://musicdistributionsystem.com/tracks/';
export const releaseUrl = 'https://musicdistributionsystem.com/release/';
export const API_ALLRELEASE = 'http://84.16.239.66/GetAllReleases?UserId=5819A966-F236-4B85-B902-A6E890E38B47';

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
