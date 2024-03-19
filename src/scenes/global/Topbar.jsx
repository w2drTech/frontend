import {
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  LogoutOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Topbar = ({ header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const title = useSelector((state) => state.topic.headerTopic);
  const today = new Date();
  useEffect(() => {

  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate.replace(/,/g, "/");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box>

          <Header title={title} subtitle={`Hello! Welcome to your dashboard`} />
      
      </Box>
      <Box>
        <h3>{formatDate(currentDateTime)}</h3>
      </Box>
      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <Tooltip title={"Logout"} arrow>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton
              onClick={() => {
                localStorage.removeItem("patientId");
                localStorage.removeItem("CenterCode");
                localStorage.removeItem("User");
                localStorage.removeItem("Status");
                window.location.replace("/");
              }}
            >
              <LogoutOutlined />
            </IconButton>
          </Link>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
