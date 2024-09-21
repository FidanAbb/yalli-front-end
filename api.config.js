import axios from "axios";

const apiURL = "https://yalli-back-end.onrender.com/v1";

export const apiConfig = {
  baseUrl: `${apiURL}`,
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
