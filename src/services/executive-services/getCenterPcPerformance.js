import http from '../httpService';
import apiConfig from '../../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/performanceChartDetailsInCenter`;
const apiEndPointForCircles = `${apiConfig.apiUrl}executiveLevel/get/centerPerformanceDetails`;
const apiEndPointForChartDateRange = `${apiConfig.apiUrl}executiveLevel/get/performanceChartInCenterWithDate`;

export function getSelectedCenterPCPerformance(centerId)
{
    console.log(`${apiEndPoint}/${centerId}`)
    return http.get(`${apiEndPoint}/${centerId}`);  
}
export function getSelectedCenterPCPerformanceForCircle(centerId)
{
    return http.get(`${apiEndPointForCircles}/${centerId}`);  
}
export function getSelectedCenterPCPerformanceForDateRange(centerId,startDate,endDate)
{
    return http.post(apiEndPointForChartDateRange,{
        centerCode: centerId,
        fromDate: startDate,
        toDate:endDate
    });  
}

export default {
    getSelectedCenterPCPerformance,
    getSelectedCenterPCPerformanceForCircle
}

