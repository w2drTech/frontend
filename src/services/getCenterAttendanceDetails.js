import http from "./httpService";
import apiConfig from "../utils/config.json";

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/studentAttendanceChatDetailsByCenter`;
const apiEndPointForAllCenters = `${apiConfig.apiUrl}dpStaff/get/getAllCenters`;
const apiEndPointForCircles = `${apiConfig.apiUrl}executiveLevel/get/studentAttendanceDetailsByCenter`;
const apiEndPointForMoreToGo = `${apiConfig.apiUrl}centerInCharge/get/onGoingCenterDetails`;
const apiEndPointForOpenTimeChartData = `${apiConfig.apiUrl}executiveLevel/get/centerOpenTimeAvgChart`;

export function getSelectedCenterAttendance(centerId) {
  return http.get(`${apiEndPoint}/${centerId}`);
}
export function getSelectedCenterAttendanceForCircle(centerId) {
  return http.get(`${apiEndPointForCircles}/${centerId}`);
}
export function getAllCenters() {
  return http.get(apiEndPointForAllCenters);
}
export function getSelectedCenterMoreToGoDetails(centerId) {
  console.log(`${apiEndPointForMoreToGo}/${centerId}`);
  return http.get(`${apiEndPointForMoreToGo}/${centerId}`);
}
export function getSelectedCenterOpenTimeChartData(centerId) {
  return http.get(`${apiEndPointForOpenTimeChartData}/${centerId}`);
}
export default {
  getSelectedCenterAttendance,
  getSelectedCenterAttendanceForCircle,
  getSelectedCenterMoreToGoDetails,
  getSelectedCenterOpenTimeChartData,
};
