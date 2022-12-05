import { http } from "./http";

import endpoints from "../constants/endpoints";

import { Signup, Userlogin } from "../constants/globalType";

export const loginUser = (payload: Userlogin) => {
  const url = endpoints.LOGIN;

  return http.post(url, payload);
};

export const signupUser = (payload: Signup) => {
  const url = endpoints.LOGIN;

  return http.post(url, payload);
};

export const practitioner = () => {
  const url = endpoints.PRACTITIONER;

  return http.get(url);
};
