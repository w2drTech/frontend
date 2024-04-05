import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { countries } from "./scenes/student-attendance-interface/data";
import HomeComponent from "./scenes/student-attendance-interface/homeComponent";
import { Route, Routes } from "react-router-dom";
import StudentAttendance from "./scenes/studentAttendance";
import Register from "./scenes/register";
import LoginLayout from "./Layouts/LoginLayout";
import HomeLayout from "./Layouts/HomeLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import ExecutiveLevelDashboard from "./scenes/execative-level-dashboard";
import Notfound from "./scenes/NotFound/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import CenterInchargeDashboard from "./scenes/center-incharge-dashboard";
import CenterManagerDashboardLayout from "./Layouts/CenterInchargeDashboard";
import ViewAllStudents from "./scenes/center-incharge-dashboard/view-all-students";
import DailyStudentOverview from "./scenes/center-incharge-dashboard/daily-student-overview";
import PCPerformanceStats from "./scenes/center-incharge-dashboard/pc-perfomance";
import UploadFiles from "./scenes/center-incharge-dashboard/upload-files";
import PCWorkHours from "./scenes/execative-level-dashboard/pc-work-hours";
import DpStaffDashboardLayout from "./Layouts/DPStaffDashboard";
import AddCenter from "./scenes/staff-dashboard/add-center";
import AddCenterManager from "./scenes/staff-dashboard/add-center-manager";
import OutlookUsers from "./scenes/staff-dashboard/ms-365-users/outlookusers";
import TeamsUsers from "./scenes/staff-dashboard/ms-365-users/Teams-users";
import YammerUsers from "./scenes/staff-dashboard/ms-365-users/yammer-users";
import SuperAdminLayout from "./Layouts/SuperAdminLayout";
import SuperAdminDashboard from "./scenes/super-admin-dashboard";
import CenterPerformance from "./scenes/center-performance";
import Bonus from "./scenes/staff-dashboard/bonus";
import SalaryDetails from "./scenes/staff-dashboard/bonus/salaryDetails";
import { applyMiddleware, combineReducers, createStore } from "redux";
import headerTopicReducer from "./store/reducer/headerChange";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
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
                <Route index element={<HomeLayout />} />
                <Route path="/" element={<HomeLayout />}>
                  <Route
                    path="/"
                    element={<HomeComponent images={countries} />}
                  />
                  <Route path="register" element={<Register />} />
                </Route>
                <Route path="/login" element={<LoginLayout />} />

                <Route
                  element={
                    <ProtectedRoute
                      isAllowed={!!user && user.roles.includes("ADM")}
                    />
                  }
                >
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route
                      path="executive"
                      element={<ExecutiveLevelDashboard />}
                    />
                    <Route
                      path="student-attendance"
                      element={<StudentAttendance />}
                    />
                    <Route
                      path="top-performance"
                      element={<CenterPerformance />}
                    />
                    <Route path="pc-performance" element={<PCWorkHours />} />
                    <Route path="outlook" element={<OutlookUsers />} />
                    <Route path="teams" element={<TeamsUsers />} />
                    <Route path="yammer" element={<YammerUsers />} />
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
                    element={<CenterManagerDashboardLayout />}
                  >
                    <Route
                      path="center-manager"
                      element={<CenterInchargeDashboard />}
                    />
                    <Route path="view-all" element={<ViewAllStudents />} />
                    <Route
                      path="today-students"
                      element={<DailyStudentOverview />}
                    />
                    <Route path="pc-stats" element={<PCPerformanceStats />} />
                    <Route path="file-upload" element={<UploadFiles />} />
                  </Route>
                </Route>
                <Route
                  element={
                    <ProtectedRoute
                      isAllowed={!!user && user.roles.includes("DPS")}
                    />
                  }
                >
                  <Route
                    path="/dp-staff-dashboard"
                    element={<DpStaffDashboardLayout />}
                  >
                    <Route path="staff" element={<ExecutiveLevelDashboard />} />
                    <Route
                      path="student-attendance"
                      element={<StudentAttendance />}
                    />
                    <Route path="pc-performance" element={<PCWorkHours />} />
                    <Route
                      path="top-performance"
                      element={<CenterPerformance />}
                    />
                    <Route path="center-bonus" element={<Bonus />} />
                    <Route path="salary-details" element={<SalaryDetails />} />
                    <Route path="add-center" element={<AddCenter />} />
                    <Route
                      path="add-center-manager"
                      element={<AddCenterManager />}
                    />
                    <Route path="outlook" element={<OutlookUsers />} />
                    <Route path="teams" element={<TeamsUsers />} />
                    <Route path="yammer" element={<YammerUsers />} />
                  </Route>
                </Route>
                <Route
                  element={
                    <ProtectedRoute
                      isAllowed={!!user && user.roles.includes("hmw")}
                    />
                  }
                >
                  <Route path="/super-admin" element={<SuperAdminLayout />}>
                    <Route path="admin" element={<SuperAdminDashboard />} />
                  </Route>
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
