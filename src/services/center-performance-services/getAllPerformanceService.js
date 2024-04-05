import http from '../httpService';
import apiConfig from '../../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/allCentersWithPerformance`;

export function getAllPerformance()
{
    return http.get(`${apiEndPoint}`);  
}


export default {
    getAllPerformance,

}

