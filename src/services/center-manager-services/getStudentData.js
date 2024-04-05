import apiConfig from "../../utils/config.json";
import httpService from "../httpService";

const apiEndPoint = `${apiConfig.apiUrl}centerInCharge/get/allStudents`;
const apiEndPointForTodayStudents = `${apiConfig.apiUrl}centerInCharge/get/todayAllStudents`;
const apiEndPointUpdateStudent = `${apiConfig.apiUrl}centerInCharge/update/student`;
const apiEndPointUpdateAttendance = `${apiConfig.apiUrl}centerInCharge/update/student/attendanceOut`;

export function getCenterAllStudents(centerId) {
  return httpService.get(`${apiEndPoint}/${centerId}`);
}
export function getCenterTodayStudents(centerId) {
  return httpService.get(`${apiEndPointForTodayStudents}/${centerId}`);
}
export function updateRegisteredStudent(studentCode, student) {
  const obj = {
    studentCode: studentCode,
    studentName: student.studentName,
    email: student.email,
    phoneNumber: student.phoneNumber,
    parentPhoneNumber: student.parentPhoneNumber,
    address: student.address,
  };
  return httpService.put(apiEndPointUpdateStudent, obj);
}
export function updateStudentAttendance(studentAttendanceCode) {
  console.log(studentAttendanceCode);
  const obj = {
    attendanceCode: studentAttendanceCode,
  };
  return httpService.put(apiEndPointUpdateAttendance, obj);
}
export default {
  getCenterAllStudents,
  getCenterTodayStudents,
  updateStudentAttendance,
};
