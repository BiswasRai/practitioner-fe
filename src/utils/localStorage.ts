import { isEmpty } from "./string";

/**
 * Function to get access token.
 *
 * @returns {string | null}
 */
export const getAccessToken = (): string | null => {
  const accessToken = localStorage.getItem("access_token");

  if (isEmpty(accessToken)) return "";

  return accessToken;
};

/**
 * Function to set access token.
 *
 * @param {string} accessToken Access token
 */
export const setAccessToken = (accessToken: string) => {
  if (isEmpty(accessToken)) return "";

  localStorage.setItem("access_token", accessToken);
};

/**
 * Function to get refresh token.
 *
 * @param {string} refreshToken refresh token
 */
export const getRefreshToken = (): string | null => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (isEmpty(refreshToken)) return "";

  return JSON.stringify(refreshToken);
};

/**
 * Function to set refresh token.
 *
 * @param {string} refreshToken
 */
export const setRefreshToken = (refreshToken: string) => {
  if (isEmpty(refreshToken)) return;

  localStorage.setItem("refresh_token", refreshToken);
};

/**
 * Function to remove access token.
 */
export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

/**
 * Function to remove access token.
 */
export const removeRefreshToken = () => {
  localStorage.removeItem("refresh_token");
};
