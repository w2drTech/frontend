import apiConfig from "../../utils/config.json";
import httpService from "../httpService";

const apiEndPoint = `${apiConfig.apiUrl}dpStaff/insert/center`;
const apiEndPointForCM = `${apiConfig.apiUrl}dpStaff/insert/centerInCharge`;

export function registerCenter(value) {
  const obj = {
    centerCode:value.centerCode,
    centerName:value.name,
    provinceID:value.province,
    districtID:value.district,
    address:value.address,
    pcCount:value.pcQty  
  };
  return httpService.post(apiEndPoint, obj);
}
export function registerCenterManager(value) {
  const obj = {
    centerCode:value.centerCode,
    name:value.name,
    email:value.email,
    phoneNumber:value.phone,
    address:value.address,
  };
  console.log(obj)
    return httpService.post(apiEndPointForCM, obj);
  }

export default {
  registerCenter,
  registerCenterManager
};
