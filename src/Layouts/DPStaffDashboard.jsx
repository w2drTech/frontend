import { Route, Routes } from "react-router-dom";
import SidebarComponent from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Notfound from "../scenes/NotFound/Notfound";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddLocationIcon from "@mui/icons-material/AddLocation";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ExecutiveLevelDashboard from "../scenes/execative-level-dashboard";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

import { useState } from "react";

const DpStaffDashboardLayout = () => {
  const [test,setTest] = useState();
  const menuItems = [
    {
      title: "Dashboard",
      to: "staff",
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
          onclick:()=>setTest("Attendance")
        },
        {
          title: "Work Hours Analysis: PCs",
          to: "pc-performance",
          icon: <ComputerOutlinedIcon />,
        },
      ],
    },
    {
      title: "Center's Performance Details",
      to: "top-performance",
      icon: <TrendingUpOutlinedIcon />,
    },
    {
      title: "Bonus",
      to: "center-bonus",
      icon: <PriceCheckIcon />,
    },
    {
      title: "Center Management",
      icon: <ManageHistoryIcon />,
      subItems: [
        {
          title: "Add Computer Center",
          to: "add-center",
          icon: <AddLocationIcon />,
        },
        {
          title: "Add Center Manager",
          to: "add-center-manager",
          icon: <GroupAddIcon />,
        },
      ],
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

  return (
    <div className="app">
      <SidebarComponent menuItems={menuItems} />
      <main className="content">
        <Topbar header = {test}/>
        <Routes>
          <Route path="staff" exact element={<ExecutiveLevelDashboard />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  );
};
export default DpStaffDashboardLayout;
