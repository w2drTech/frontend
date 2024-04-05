import apiConfig from "../../utils/config.json";
import httpService from "../httpService";

const apiEndPoint = `${apiConfig.apiUrl}get/studentCountChartInCenterWithDate`;

export function getCenterDetails() {
  return httpService.get(apiEndPoint);
}

export default {
  getCenterDetails,
};
