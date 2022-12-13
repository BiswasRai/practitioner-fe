import axios from "axios";
import { BaseType } from "typescript";
import endpoints from "../constants/endpoints";
import { interpolate } from "../utils/string";
import { http } from "./http";

export const fetchAll = () => {
  const url = interpolate(endpoints.PRACTITIONER, { id: "" });

  return http.get(url);
};

export const create = (payload: object | undefined | void) => {
  const url = interpolate(endpoints.PRACTITIONER, { id: "" });

  return http.post(url, payload);
};

export const edit = (id: number, payload: object | undefined | void) => {
  const url = interpolate(endpoints.PRACTITIONER, { id });

  return http.put(url, payload);
};

export const remove = (id: number) => {
  const url = interpolate(endpoints.PRACTITIONER, { id });

  return http.delete(url);
};

export const uploadImage = (data: string) => {
  const url = interpolate(endpoints.IMAGE_UPLOAD);
  const modifiedPayload = JSON.stringify({ data: data });
  console.log(modifiedPayload);

  return axios.post(url, modifiedPayload);
};
