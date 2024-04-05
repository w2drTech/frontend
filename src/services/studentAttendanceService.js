import http from "./httpService";
import apiConfig from "../utils/config.json";

const apiEndPointForGetStudent = `${apiConfig.apiUrl}students/get/studentLogin`;
const apiEndpointForInsert = `${apiConfig.apiUrl}students/insert/student`;
const apiEndPointForMarkAttendance = `${apiConfig.apiUrl}students/insert/student/attendanceIn`;
const apiEndPointForUpdateAttendance = `${apiConfig.apiUrl}students/update/student/attendanceOut`;
const apiEndPointForVerification = `${apiConfig.apiUrl}students/insert/verifyStudent`;

export function getStudent(email) {
  return http.get(`${apiEndPointForGetStudent}/${email}`);
}
export function registerStudent(student) {
  return http.post(apiEndpointForInsert, {
    studentName: student.name,
    email: student.email,
    centerCode: student.center,
    phoneNumber: student.phone,
    parentPhoneNumber: student.guardianPhone,
    address: student.address,
  });
}
export function markAttendance(attendance) {
  return http.post(apiEndPointForMarkAttendance, {
    email: attendance.email,
    pcCode: attendance.pcId,
  });
}
export function updateAttendance(attendanceKey) {
  return http.put(apiEndPointForUpdateAttendance, {
    attendanceCode: attendanceKey,
  });
}
export function verifyStudentEmail(verification) {
  console.log(verification)
  return http.post(apiEndPointForVerification, {
    studentCode: verification.studentCode,
    otp: verification.otp,
  });
}
export default {
  getStudent,
  registerStudent,
  markAttendance,
  verifyStudentEmail
};
