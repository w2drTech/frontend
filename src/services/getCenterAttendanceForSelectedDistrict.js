import http from './httpService';
import apiConfig from '../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/studentAttendanceChatDetailsByDistrict`;
const apiEndPointForCircles = `${apiConfig.apiUrl}executiveLevel/get/studentAttendanceDetailsByDistrict`;

export function getSelectedDistrictAttendance(districtId)
{
    return http.get(`${apiEndPoint}/${districtId}`);  
}
export function getSelectedDistrictAttendanceForCircle(districtId)
{
    return http.get(`${apiEndPointForCircles}/${districtId}`);  
}

export default {
    getSelectedDistrictAttendance,
    getSelectedDistrictAttendanceForCircle
}
