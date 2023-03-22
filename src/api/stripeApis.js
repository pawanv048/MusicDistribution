import axios from "axios";

export const createPaymentIntent = (data) => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:4002/payment-sheet', data)
    .then(function(res){
      resolve(res)
    }).catch(function(error){
      reject(error)
    })
  })
}

export const baseUrl = 'http://84.16.239.66/api/';
export const trackUrl = 'https://musicdistributionsystem.com/tracks/';

export const API = async ({url, params, method, headers, onSuccess, onError}) => {
    let defaultHeaders = {
      'Content-Type': 'multipart/form-data',
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


  const apiServers = { createPaymentIntent, API}

  export default apiServers;
  