import apiConfig from "../../utils/config.json";
import httpService from "../httpService";

const apiEndPoint = `${apiConfig.apiUrl}centerInCharge/insert/attendanceIn`;
const apiEndPointForEndCenter = `${apiConfig.apiUrl}centerInCharge/update/attendanceOut`;

export function setCenterStart(userId, centerId) {
  return httpService.post(`${apiEndPoint}/${userId}/${centerId}`);
}
export function setCenterEnd(attendanceCode, centerId) {
  return httpService.put(
    `${apiEndPointForEndCenter}/${attendanceCode}/${centerId}`
  );
}
// export function updateStudentAttendance(studentAttendanceCode) {
//   const obj = {
//     attendanceCode: studentAttendanceCode,
//   };
//   return httpService.put(apiEndPointUpdateAttendance, obj);
// }
export default {
  setCenterStart,
  setCenterEnd,
};
