import { Route, Routes,Navigate } from "react-router-dom";
import Carousel from "../scenes/student-attendance-interface";
import HomeComponent from "../scenes/student-attendance-interface/homeComponent";
import { countries } from "../scenes/student-attendance-interface/data";
import Register from "../scenes/register";
import SignInSide from "../scenes/login/login";
import Notfound from "../scenes/NotFound/Notfound";

const LoginLayout = () => {
  return (
    <Routes>
      <Route path="/" exact element={<SignInSide />} />
      <Route path="*" element={<Notfound/>}/>
    </Routes>
  );
};

export default LoginLayout;
