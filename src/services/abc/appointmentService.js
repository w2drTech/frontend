import http from "../httpService";
import apiConfig from "../../utils/config.json";

const apiEndPoint = `${apiConfig.apiUrl}appointment/get`;
const apiEndPointForAddAppointment = `${apiConfig.apiUrl}appointment/add`;

export function getAppointments() {
  console.log(apiEndPoint);
  return http.get(apiEndPoint);
}
export function addAppointment(values,patientId)
{

    return http.post(`${apiEndPointForAddAppointment}/${patientId}`,{
        date: values.selectedDate,
        time: values.time,
        testType:values.testType
    });  
}
export default {
  getAppointments,
};
