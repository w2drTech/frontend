import { Route, Routes } from "react-router-dom";
import HomeComponent from "../scenes/student-attendance-interface/homeComponent";
import Carousel from "../scenes/student-attendance-interface";
import Register from "../scenes/register";
import { countries } from "../scenes/student-attendance-interface/data";
import { Switch } from "@mui/material";
import Notfound from "../scenes/NotFound/Notfound";

const HomeLayout = () => {
  const attendanceKey = localStorage.getItem("studentAttendanceKey");
  return (
    <Routes>
      {attendanceKey ? (
        <Route path="/" element={<HomeComponent images={countries} />} />
      ) : (
        <Route path="/" element={<Carousel images={countries} />} />
      )}
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Notfound/>}/>
    </Routes>
  );
};

export default HomeLayout;
