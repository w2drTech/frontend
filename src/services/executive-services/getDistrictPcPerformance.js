import http from '../httpService';
import apiConfig from '../../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/performanceChartDetailsInDistrict`;
const apiEndPointForCircles = `${apiConfig.apiUrl}executiveLevel/get/districtPerformanceDetails`;

export function getSelectedDistrictPCPerformance(districtId)
{
    console.log(`${apiEndPoint}/${districtId}`)
    return http.get(`${apiEndPoint}/${districtId}`);  
}
export function getSelectedDistrictPCPerformanceForCircle(districtId)
{
    
    return http.get(`${apiEndPointForCircles}/${districtId}`);  
}

export default {
    getSelectedDistrictPCPerformance,
    getSelectedDistrictPCPerformanceForCircle
}

