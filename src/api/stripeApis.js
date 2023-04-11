import axios from "axios";

export const createPaymentIntent = (data) => {
  //const secret_key = 'pk_test_51Ml8X3SBYhutCDHOCeRf0OAMhtX4Rn8ek0ysITKJ80KztqpGLnbSPC4ziR7bDeRalkzamnvLL6GAunRz15S3xLuA003XaNDdZx';
  return new Promise((resolve, reject) => {
    axios.post(
      'http://localhost:4002/payment-sheet',
      data
    )
      .then(function (res) {
        resolve(res)
        console.log('Payment intent created:', data);
      })
      .catch(function (error) {
        reject(error)
      })
  })
  
}


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


const apiServers = { createPaymentIntent, API }

export default apiServers;
