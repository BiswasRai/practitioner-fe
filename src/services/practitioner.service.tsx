import endpoints from "../constants/endpoints";
import { http } from "./http";

export const fetchAll = () => {
  const url = endpoints.PRACTITIONER;

  return http.get(url);
};
