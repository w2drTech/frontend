import http from './httpService';
import apiConfig from '../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/homeDetails`;

export function getStatBoxData()
{
    return http.get(`${apiEndPoint}`);
}
export default {
    getStatBoxData
}