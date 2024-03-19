import { Route, Routes } from "react-router-dom";
import ExecutiveLevelDashboard from "../scenes/execative-level-dashboard";
import SidebarComponent from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import Notfound from "../scenes/NotFound/Notfound";
import PatientDashboard from "../scenes/execative-level-dashboard";
const menuItems = [
  {
    title: "Add Appointment",
    to: "executive",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "View Reports",
    to: "top-performance",
    icon: <TrendingUpOutlinedIcon />,
  },
];

const DashboardLayout = () => {
  return (
    <div className="app">
      <SidebarComponent
        menuItems={menuItems}
        userType={"ADM"}
        to="https://web.yammer.com/main/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxNDEzNjI2NTExMzYifQ/new"
      />
      <main className="content">
        <Topbar />

        <Routes>
          <Route path="/executive" exact element={<PatientDashboard />} />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardLayout;
