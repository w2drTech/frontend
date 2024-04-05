import http from '../httpService';
import apiConfig from '../../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/homePerformanceChartDetails`;
const apiEndPointForStatBox = `${apiConfig.apiUrl}executiveLevel/get/performanceHomeDetails`;

export function getLineChartDataForPCPerformance()
{
    return http.get(`${apiEndPoint}`);
}
export function getPCPerformanceStatBoxData()
{
    return http.get(`${apiEndPointForStatBox}`);
}

export default {
    getLineChartDataForPCPerformance,
    getPCPerformanceStatBoxData
}