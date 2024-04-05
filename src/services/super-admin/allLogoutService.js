import apiConfig from "../../utils/config.json";
import httpService from "../httpService";

const apiEndPoint = `${apiConfig.apiUrl}executiveLevel/get/allStudentLogOut`;
export function allLogout()
{
    return httpService.get(`${apiEndPoint}`);  
}


export default {
    allLogout,
}