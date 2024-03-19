import { Route, Routes,Navigate } from "react-router-dom";

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
