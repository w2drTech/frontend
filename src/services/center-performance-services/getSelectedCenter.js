import http from '../httpService';
import apiConfig from '../../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/CenterWithPerformanceAnyDate`;
const apiEndPointForTable = `${apiConfig.apiUrl}executiveLevel/get/PCsPerformanceInTable`
const apiEndPointForCData = `${apiConfig.apiUrl}centerInCharge/get/centerDetailsExcel`
export function getSelectedCenterPerformance(centerCode,openDate,status)
{
    console.log(centerCode,openDate,status)
    return http.post(apiEndPoint,{
        centerCode: centerCode,
        openDate: openDate,
        status:status
    });  
}
export function getSelectedCenterPCDetails(centerCode,openDate)
{
    return http.post(apiEndPointForTable,{
        centerCode: centerCode,
        openDate: openDate,
    });  
}
export function getCenterDailyPerformance(attendanceCode,centerCode)
{
    return http.get(`${apiEndPointForCData}/${attendanceCode}/${centerCode}`);  
}
export default {
    getSelectedCenterPerformance,
    getSelectedCenterPCDetails,
    getCenterDailyPerformance
}
