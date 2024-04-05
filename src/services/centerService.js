import http from './httpService';
import apiConfig from '../utils/config.json';
import axios from 'axios';

const apiEndPoint = `${apiConfig.apiUrl}students/get/centers`;
export function getCenters(selectedDistrict)
{
    return http.get(`${apiEndPoint}/${selectedDistrict}`);
}
