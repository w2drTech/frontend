import http from '.././httpService';
import apiConfig from '../../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/performanceChartDetailsInProvince`;
const apiEndPointForCircles = `${apiConfig.apiUrl}executiveLevel/get/provincePerformanceDetails`;

export function getSelectedProvincePCPerformance(provinceId)
{
    console.log(`${apiEndPoint}/${provinceId}`)
    return http.get(`${apiEndPoint}/${provinceId}`);  
}
export function getSelectedProvincePCPerformanceForCircle(provinceId)
{
    
    return http.get(`${apiEndPointForCircles}/${provinceId}`);  
}

export default {
    getSelectedProvincePCPerformance,
    getSelectedProvincePCPerformanceForCircle
}
