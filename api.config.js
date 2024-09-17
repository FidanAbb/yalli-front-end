import axios from "axios";

const apiURL = "https://yalli.com/";

export const apiConfig = {
  baseUrl: `${apiURL}api/web/`,
  imagePath: `imageurl`,
};

export const api = axios.create({
  baseURL: apiConfig.baseUrl,
});

export const fileUpload = axios.create({
  baseURL: apiURL,
});

export const apiAuth = axios.create({
  baseURL: apiConfig.baseUrl,
});

apiAuth.interceptors.request.use(
  config => {
    const token = window?.localStorage.getItem('token') || window?.sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
