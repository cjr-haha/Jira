import axios, { AxiosRequestConfig } from "axios";
import { useAuth } from "../context/auth";
import { useCallback } from "react";

interface Config extends AxiosRequestConfig {
  token?: string;
  data?: object;
}

const defaultConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 6000,
};

axios.interceptors.response.use(
  (successConfig): any => {
    const { data } = successConfig;
    return data;
  },
  (failMessage) => {
    const { response } = failMessage;
    return Promise.reject(response.data);
  }
);

function request(
  url: string,
  { method, token, headers, ...otherConfig }: Config = {}
) {
  const config = {
    url,
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type":
        method?.toLocaleUpperCase() === "GET" ? "" : "application/json",
      ...(headers || {}),
    },
    ...defaultConfig,
    ...otherConfig,
  };

  return axios(config);
}

// 带着token的
export const useHttpToken = () => {
  const { user } = useAuth();
  return useCallback(
    (...[url, config]: Parameters<typeof request>) =>
      request(url, { ...config, token: user?.token }),
    [user?.token]
  );
};

export default request;
