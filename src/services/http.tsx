import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken } from "../utils/localStorage";
import { isEmpty } from "../utils/string";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "CONTENT-TYPE": "application/json",
    ACCEPT: "application/json",
  },
});

/**
 * Add access token in the authorization header of the given config.
 *
 * @param {Object} axiosConfig Axios config object.
 * @param {String} accessToken
 * @returns {Object} Axios config object.
 */
const configWithAccessToken = (
  axiosConfig: AxiosRequestConfig,
  accessToken: string | null
): AxiosRequestConfig => ({
  ...axiosConfig,
  headers: {
    ...axiosConfig.headers,
    Authorization: `Bearer ${accessToken}`,
  },
});

/**
 * Request interceptors for axios instance.
 *
 * @returns {Object}
 */
http.interceptors.request.use(
  (requestConfig: AxiosRequestConfig): AxiosRequestConfig | any => {
    const accessToken = getAccessToken();

    return configWithAccessToken(requestConfig, accessToken);
  },
  (requestError) => {
    throw requestError;
  }
);

/**
 * Response interceptor for axios instance.
 *
 * @returns {Object}
 */
http.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (isEmpty(error)) {
      throw new Error(error);
    }

    const { data } = error?.response;

    throw data;
  }
);
