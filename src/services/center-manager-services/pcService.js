import apiConfig from "../../utils/config.json";
import httpService from "../httpService";

const apiEndPoint = `${apiConfig.apiUrl}dpStaff/get/todayNotWorkingPcsInCenter`;


export function getNotMarkedPCs(centerId) {
  return httpService.get(`${apiEndPoint}/${centerId}`);
}

export default {
  getNotMarkedPCs,
  
};
