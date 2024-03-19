import http from "../httpService";
import apiConfig from "../../utils/config.json";

const apiEndPoint = `${apiConfig.apiUrl}user/login`;

export function userLogin(username, password) {
  return http.post(apiEndPoint, {
    username: username,
    password: password,
  });
}
export default {
  userLogin,
};
