import http from './httpService';
import apiConfig from '../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/homeChartDetails`;
const apiEndPointForWorkingCenters = `${apiConfig.apiUrl}executiveLevel/get/todayWorkingCenter `;

export function getExecutiveDashboardLineChartData()
{
    return http.get(`${apiEndPoint}`);
}
export function getWorkingCentersData()
{
    return http.get(`${apiEndPointForWorkingCenters}`);
}
export default {
    getExecutiveDashboardLineChartData
}