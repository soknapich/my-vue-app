import axios from 'axios';
import { useLoadingStore } from '@/stores/loading';
import APIs from '@/constants/apis';
import { getToken, setToken } from '@/services/authentication'; // get token from cookie
import { doRefreshToken } from '@/apis/authentication';

const whiteListReturnError = [
  APIs.authentication.signin.url,
  'sys_auth/api/verify-api'
];
// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || 'http://localhost:8000', // url = base url + request url
  timeout: 1000000 //(1000000ms) request timeout = 16 minutes 40 seconds.
});

// request interceptor
service.interceptors.request.use(
  async (config) => {
    const token = (await getToken()) || '';
    config.headers.Authorization = `Bearer ${token}`;

    //Pinia
    const loading = useLoadingStore();
    loading.start();

    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom status
   * Here is just an example
   * You can also judge the status by HTTP Status status
   */
  async (response) => {
    const loading = useLoadingStore();
    loading.end();
    return response;
  },
  async (error) => {
    const loading = useLoadingStore();
    loading.end();

    if (error.response?.status === 401) {
      return false;

    } else if (error.response?.status === 403) {
      const refreshToken = (await getToken('refreshToken')) || '';
      const newTokenResult = await doRefreshToken({ refreshToken });
      //console.log(newTokenResult.data.token);
      if (newTokenResult) {
        await setToken('token', newTokenResult.data.token);
        await setToken('refreshToken', newTokenResult.data.refreshToken);
      }
    } else {
      /**
       * Show Error Alert Message
       */
      // If Network error
      if (error.message.toLowerCase() === 'network error' || !error.response) {
        // showAlertMessage({ isSuccess: false, message: error.message });
      }
      // if url is in whiteListReturnError, return the error for individual component to handle
      if (whiteListReturnError.indexOf(error.config.url) === -1) {
        let errorMessage = '';
        if (error.response) {
          errorMessage =
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : error.response.statusText;
        } else {
          errorMessage = error.message;
        }
        // showAlertMessage({ isSuccess: false, message: errorMessage });
      }
      /**
       * url in whitelist will
       * return isSuccess and error message
       */
      if (
        error.response &&
        whiteListReturnError.indexOf(error.config.url) > -1
      ) {
        const response = {
          status: error.response.status,
          isSuccess: false,
          message: error.response.data.message,
          data: ''
        };
        return response;
      }
      if (error && error.response && error.response.data) {
        return error.response.data;
      }
      return Promise.reject(error);
    }
  }
);
export default service;
