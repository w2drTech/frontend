import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { countries } from "./scenes/student-attendance-interface/data";

import { Route, Routes } from "react-router-dom";

import Register from "./scenes/register";
import LoginLayout from "./Layouts/LoginLayout";

import DashboardLayout from "./Layouts/DashboardLayout";

import Notfound from "./scenes/NotFound/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";


import { applyMiddleware, combineReducers, createStore } from "redux";
import headerTopicReducer from "./store/reducer/headerChange";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
import Carousel from "./scenes/student-attendance-interface";
import PatientDashboard from "./scenes/execative-level-dashboard";
import DpStaffDashboardLayout from "./Layouts/DPStaffDashboard";
const rootReducer = combineReducers({
  topic: headerTopicReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  const [theme, colorMode] = useMode();
  const role = localStorage.getItem("Role");
  const user = {
    id: "1",
    roles: role ?? [],
  };
  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div className="app">
            <main className="content">
              <Routes>
                <Route />

                <Route path="/" element={<Carousel images={countries} />} />
                <Route path="register" element={<Register />} />

                <Route path="/login" element={<LoginLayout />} />

                <Route
                  element={
                    <ProtectedRoute
                      isAllowed={!!user && user.roles.includes("Patient")}
                    />
                  }
                >
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route path="executive" element={<PatientDashboard />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <ProtectedRoute
                      isAllowed={!!user && user.roles.includes("CIC")}
                    />
                  }
                >
                  <Route
                    path="/staff-dashboard"
                    element={<DpStaffDashboardLayout />}
                  ></Route>
                </Route>

                <Route path="*" element={<Notfound />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}
export default App;
