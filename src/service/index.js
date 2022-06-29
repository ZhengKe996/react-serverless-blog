import axios from "axios";

const instance = axios.create({
  timeout: "60000",
});

instance.interceptors.request.use(function (config) {
  const token = window.localStorage._authing_token;
  token && (config.headers.token = token);
  console.log(config.headers);
  return config;
});

instance.interceptors.response.use(function (response) {
  return response?.data;
});

export default instance;
