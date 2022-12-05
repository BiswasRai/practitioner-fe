import { isEmpty } from "./string";

export const getAccessToken = (): string | null => {
  const accessToken = localStorage.getItem("access_token");

  if (isEmpty(accessToken)) return "";

  return localStorage.getItem("accessToken");
};
