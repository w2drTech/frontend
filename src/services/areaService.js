import http from './httpService';
import apiConfig from '../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}students/get/provinces`;

export function getProvinces()
{
    return http.get(apiEndPoint)  
}

export default {
    getProvinces,
}