import apiConfig from "../../utils/config.json";
import httpService from "../httpService";

const apiEndPoint = `${apiConfig.apiUrl}dpStaff/get/allCentersSalary`;
const apiEndPointForGeneratedData = `${apiConfig.apiUrl}dpStaff/get/salarySummary`;
const apiEndPointForOpenHoursBonusData = `${apiConfig.apiUrl}dpStaff/get/openTimeBonus`;
const apiEndPointForPerformanceBonusData = `${apiConfig.apiUrl}dpStaff/get/performanceBonus`;
const apiEndPointForPPCBonusData = `${apiConfig.apiUrl}dpStaff/get/pcsBonus`;
const apiEndPointFinalSalaryData = `${apiConfig.apiUrl}dpStaff/get/finalSalary`;

export function getGeneratedData() {
  return httpService.get(apiEndPointForGeneratedData);
}
export function getOpenHoursData(id) {
  return httpService.get(`${apiEndPointForOpenHoursBonusData}/${id}`);
}
export function getPerformanceData(id) {
  return httpService.get(`${apiEndPointForPerformanceBonusData}/${id}`);
}
export function getPCData(id) {
  return httpService.get(`${apiEndPointForPPCBonusData}/${id}`);
}
export function getFinalSalaryData(id) {
  return httpService.get(`${apiEndPointFinalSalaryData}/${id}`);
}
export function getSelectedDateRangeData(startDate, endDate) {
  console.log(startDate, endDate);
  const obj = {
    fromDate: startDate,
    toDate: endDate,
  };
  return httpService.post(apiEndPoint, obj);
}
export default {
  getSelectedDateRangeData,
  getGeneratedData,
  getOpenHoursData,
  getPCData,
  getFinalSalaryData
};
