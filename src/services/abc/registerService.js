import http from '../httpService';
import apiConfig from '../../utils/config.json';

const apiEndPoint = `${apiConfig.apiUrl}user/register`;
const apiEndPointForPatient = `${apiConfig.apiUrl}patient/add`;
const apiEndPointForGetPatient = `${apiConfig.apiUrl}patient/get`;

export function patientUserRegister(values,id)
{
    return http.post(`${apiEndPoint}/${id}`,{
        username: values.username,
        password: values.password,
        userType:"Patient"
    });  
}
export function patientRegister(values)
{
    console.log(apiEndPointForPatient)
    return http.post(apiEndPointForPatient,{
        name: values.name,
        email: values.email,
        contactDetails:values.phone,
        medicalHistory:values.medicalHistory
    });  
}
export function getPatients() {
    console.log(apiEndPointForGetPatient)
    return http.get(apiEndPointForGetPatient);
  }

export default {
    patientUserRegister,
    patientRegister,
    getPatients
}

