import http from "./httpService";
import apiConfig from "../utils/config.json";

const apiEndPoint = `${apiConfig.apiUrl}centerInCharge/login`;

export function login(email, password) {
  return http.get(`${apiEndPoint}/${email}/${password}`);
}

export default {
  login,
};
