import { Route, Routes } from "react-router-dom";
import SidebarComponent from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Notfound from "../scenes/NotFound/Notfound";
import CenterInchargeDashboard from "../scenes/center-incharge-dashboard";
import ViewAllStudents from "../scenes/center-incharge-dashboard/view-all-students";
import DailyStudentOverview from "../scenes/center-incharge-dashboard/daily-student-overview";
import PCPerformanceStats from "../scenes/center-incharge-dashboard/pc-perfomance";
import UploadFiles from "../scenes/center-incharge-dashboard/upload-files";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import InsightsIcon from '@mui/icons-material/Insights';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TodayIcon from '@mui/icons-material/Today';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const CenterManagerDashboardLayout = () => {
  const menuItems = [
    {
      title: "Dashboard",
      to: "center-manager",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "Registered Students",
      to: "view-all",
      icon: <HowToRegIcon />,
    },
    {
      title: "PC Performance Stats",
      to: "pc-stats",
      icon: <InsightsIcon />,
    },
    {
      title: "Daily Analytics",
      icon: <SignalCellularAltIcon />,
      subItems: [
        {
          title: "Daily Student Overview",
          to: "today-students",
          icon: <TodayIcon />,
        },
      ],
    },
    // {
    //   title: "Upload Files",
    //   to: "file-upload",
    //   icon: <DriveFolderUploadIcon />,
    // },
  ];

  return (
    <div className="app">
      <SidebarComponent menuItems={menuItems} />
      <main className="content">
        <Topbar />

        <Routes>
          <Route
            path="/center-manager"
            exact
            element={<CenterInchargeDashboard />}
          />
          <Route path="view-all" element={<ViewAllStudents />} />
          <Route path="today-students" element={<DailyStudentOverview />} />
          <Route path="pc-stats" element={<PCPerformanceStats />} />
          <Route path="file-upload" element={<UploadFiles />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  );
};

export default CenterManagerDashboardLayout;
