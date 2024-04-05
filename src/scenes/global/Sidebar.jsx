import { useState } from "react";
import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "react-pro-sidebar/dist/css/styles.css";
import { useEffect } from "react";
import { HomeOutlined } from "@mui/icons-material";
import Diversity2Icon from "@mui/icons-material/Diversity2";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const SidebarComponent = ({ menuItems, userType, to }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1024); // Adjust the breakpoint as needed
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Dashboard
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="Company Logo"
                  width="100px"
                  height="100px"
                  src={`../../assets/logo.png`}
                  style={{borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  DP EDUCATION
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                Productivity Monitoring System
                </Typography>
              </Box>
            </Box>
          )}
          {/* {MEnu Items} */}
          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            {menuItems.map((item, index) =>
              item.subItems ? ( // Check if it has subItems
                <SubMenu
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  selected={selected}
                  setSelected={setSelected}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <Item
                      key={subIndex}
                      title={subItem.title}
                      to={subItem.to}
                      icon={subItem.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ))}
                </SubMenu>
              ) : (
                <Item
                  key={index}
                  title={item.title}
                  to={item.to}
                  icon={item.icon}
                  selected={selected}
                  setSelected={setSelected}
                />
              )
            )}
          </Box>
          {userType && userType === "ADM" ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2} // Adjust the margin as needed
            >
              <Button
                fullWidth={!isCollapsed}
                style={{
                  width: isCollapsed ? "40px" : "100%",
                  color: colors.grey[100],
                  fontSize: "17px",
                }}
              >
                <a href={to} target="_blank">
                  {isCollapsed ? (
                    // Icon when collapsed
                    <Diversity2Icon />
                  ) : (
                    // Text when not collapsed

                    "Engage To Viva"
                  )}
                </a>
              </Button>
            </Box>
          ) : null}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarComponent;
