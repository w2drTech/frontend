import { Route, Routes } from "react-router-dom";
import ExecutiveLevelDashboard from "../scenes/execative-level-dashboard";
import SidebarComponent from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import StudentAttendance from "../scenes/studentAttendance";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import Notfound from "../scenes/NotFound/Notfound";
import PCWorkHours from "../scenes/execative-level-dashboard/pc-work-hours";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SummarizeIcon from '@mui/icons-material/Summarize';
import OutlookUsers from "../scenes/staff-dashboard/ms-365-users/outlookusers";
import TeamsUsers from "../scenes/staff-dashboard/ms-365-users/Teams-users";
import YammerUsers from "../scenes/staff-dashboard/ms-365-users/yammer-users";
import CenterPerformance from "../scenes/center-performance";
const menuItems = [
  {
    title: "Dashboard",
    to: "executive",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "Center Details",
    icon: <SchoolOutlinedIcon />,
    subItems: [
      {
        title: "Attendance Mapping",
        to: "student-attendance",
        icon: <HowToRegOutlinedIcon />,
      },
      {
        title: "Work Hours Analysis: PCs",
        to: "pc-performance",
        icon: <ComputerOutlinedIcon />,
      },
    ],
  },
  {
    title: "Top Performance Centers",
    to: "top-performance",
    icon: <TrendingUpOutlinedIcon />,
  },
  {
    title: "MS 356 User Reports",
    icon: <SummarizeIcon />,
    subItems: [
      {
        title: "Outlook",
        to: "outlook",
        icon: <AlternateEmailIcon />,
      },
      {
        title: "Teams",
        to: "teams",
        icon: <GroupsIcon />,
      },
      {
        title: "Yammer",
        to: "yammer",
        icon: <Diversity3Icon />,
      },
    ],
  },
];

const DashboardLayout = () => {
  return (
    <div className="app">
      <SidebarComponent menuItems={menuItems} userType={"ADM"} to="https://web.yammer.com/main/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxNDEzNjI2NTExMzYifQ/new" />
      <main className="content">
        <Topbar />

        <Routes>
          <Route
            path="/executive"
            exact
            element={<ExecutiveLevelDashboard />}
          />
          <Route path="student-attendance" element={<StudentAttendance />} />
          <Route path="top-performance" element={<CenterPerformance />} />
          <Route path="pc-performance" element={<PCWorkHours />} />
          <Route path="outlook" element={<OutlookUsers />} />
          <Route path="teams" element={<TeamsUsers />} />
          <Route path="yammer" element={<YammerUsers />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardLayout;
