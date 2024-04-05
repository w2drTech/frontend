import { Route, Routes } from "react-router-dom";
import SidebarComponent from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Notfound from "../scenes/NotFound/Notfound";

import StaffDashboard from "../scenes/staff-dashboard/dashboard";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import StudentAttendance from "../scenes/studentAttendance";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddCenter from "../scenes/staff-dashboard/add-center";
import AddCenterManager from "../scenes/staff-dashboard/add-center-manager";
import PCWorkHours from "../scenes/execative-level-dashboard/pc-work-hours";
import OutlookUsers from "../scenes/staff-dashboard/ms-365-users/outlookusers";
import TeamsUsers from "../scenes/staff-dashboard/ms-365-users/Teams-users";
import YammerUsers from "../scenes/staff-dashboard/ms-365-users/yammer-users";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AllCenters from "../scenes/staff-dashboard/bonus";
import ExecutiveLevelDashboard from "../scenes/execative-level-dashboard";
import SuperAdminDashboard from "../scenes/super-admin-dashboard";

const SuperAdminLayout = () => {
  const menuItems = [
    {
      title: "Dashboard",
      to: "staff",
      icon: <HomeOutlinedIcon />,
    },
  ];

  return (
    <div className="app">
      <SidebarComponent menuItems={menuItems} />
      <main className="content">
        <Topbar />

        <Routes>
          <Route path="admin" exact element={<SuperAdminDashboard />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  );
};

export default SuperAdminLayout;
