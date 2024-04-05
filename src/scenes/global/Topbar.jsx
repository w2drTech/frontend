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
  AlarmAddOutlined,
  AlarmOffOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import {
  setCenterEnd,
  setCenterStart,
} from "../../services/center-manager-services/centeroperatinghoursService";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import {
  getCenterDailyPerformance,
  getSelectedCenterPCDetails,
} from "../../services/center-performance-services/getSelectedCenter";
import { getCenterTodayStudents } from "../../services/center-manager-services/getStudentData";
import { useSelector } from "react-redux";

const Topbar = ({ header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tableData, setTableData] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const title = useSelector((state) => state.topic.headerTopic);
  const today = new Date();
  // Format today's date in DD-MON-YYYY format
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}-${
    [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ][today.getMonth()]
  }-${today.getFullYear()}`;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  const headerStyles = {
    maxWidth: "250px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "calc(14px + 1vw)",
  };
  useEffect(() => {
    console.log(header);
    const fetchData = async () => {
      try {
        const response = await fetch("https://ipinfo.io?token=151a5062f7d8bc");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setUser(localStorage.getItem("Role"));
    setName(localStorage.getItem("UserName"));
    setStatus(localStorage.getItem("Status") === "NULL" ? "Start" : "End");
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

  const handleCenterLogout = async () => {
    try {
      const attendanceCode = localStorage.getItem("Status");
      const centerId = localStorage.getItem("CenterCode");
      const response = await setCenterEnd(attendanceCode, centerId);

      const responsePC = await getSelectedCenterPCDetails(
        centerId,
        formattedToday
      );
      const responseCenterData = await getCenterDailyPerformance(
        attendanceCode,
        centerId
      );
      const responseStudentTableData = await getCenterTodayStudents(centerId);
      console.log(responseStudentTableData);
      const textDataArray = [
        [
          "Date",
          "Opened Time",
          "Closed Time",
          "Worked Time",
          "Student Count",
          "PC Count",
          "PC Performance",
        ],
        [
          responseCenterData.data.openDate,
          responseCenterData.data.openTime,
          responseCenterData.data.endTime,
          responseCenterData.data.duration,
          responseCenterData.data.studentCount,
          responseCenterData.data.pcCount,
          responseCenterData.data.pcsPerformance,
        ],
      ];
      //const responseCenterData = await getSelectedCenterPerformance(centerId,formattedToday,status)
      setTableData(responsePC.data);
      // Create a new worksheet for table data
      const wsTable = XLSX.utils.aoa_to_sheet([
        // Headers for the table
        ["PC ID", "Student Count", "Duration", "PC Performance"],
        // Extracting values from the tableData
        ...responsePC.data.map((row) => [
          row.pcCode,
          row.studentCount,
          row.durationInMin,
          row.pcPerformance,
        ]),
      ]);

      // Create a new worksheet for text data
      const wsText = XLSX.utils.aoa_to_sheet(textDataArray);

      // Auto-size columns for table data
      const rangeTable = XLSX.utils.decode_range(wsTable["!ref"]);
      const wscolsTable = [];
      for (let C = rangeTable.s.c; C <= rangeTable.e.c; ++C) {
        let maxCellLength = 0;
        for (let R = rangeTable.s.r; R <= rangeTable.e.r; ++R) {
          const cellAddress = { c: C, r: R };
          const cellRef = XLSX.utils.encode_cell(cellAddress);
          if (!wsTable[cellRef]) continue;
          const cellText = wsTable[cellRef].v.toString();
          maxCellLength = Math.max(maxCellLength, cellText.length);
        }
        wscolsTable.push({ wch: maxCellLength + 2 }); // Adding some extra width for padding
      }
      wsTable["!cols"] = wscolsTable;

      // Auto-size columns for text data
      const rangeText = XLSX.utils.decode_range(wsText["!ref"]);
      const wscolsText = [];
      for (let C = rangeText.s.c; C <= rangeText.e.c; ++C) {
        let maxCellLength = 0;
        for (let R = rangeText.s.r; R <= rangeText.e.r; ++R) {
          const cellAddress = { c: C, r: R };
          const cellRef = XLSX.utils.encode_cell(cellAddress);
          if (!wsText[cellRef]) continue;
          const cellText = wsText[cellRef].v.toString();
          maxCellLength = Math.max(maxCellLength, cellText.length);
        }
        wscolsText.push({ wch: maxCellLength + 2 }); // Adding some extra width for padding
      }
      wsText["!cols"] = wscolsText;

      const wsTable2 = XLSX.utils.aoa_to_sheet([
        // Headers for the table
        ["Name", "PC ID", "Login Time", "Logout Time"],
        // Extracting values from the tableData
        ...responseStudentTableData.data.map((row) => [
          row.name,
          row.pcCode,
          row.loginTime,
          row.logoutTime,
        ]),
      ]);
      // Auto-size columns for table data
      const rangeTable2 = XLSX.utils.decode_range(wsTable2["!ref"]);
      const wscolsTable2 = [];
      for (let C = rangeTable2.s.c; C <= rangeTable2.e.c; ++C) {
        let maxCellLength = 0;
        for (let R = rangeTable2.s.r; R <= rangeTable2.e.r; ++R) {
          const cellAddress2 = { c: C, r: R };
          const cellRef2 = XLSX.utils.encode_cell(cellAddress2);
          if (!wsTable2[cellRef2]) continue;
          const cellText2 = wsTable2[cellRef2].v.toString();
          maxCellLength = Math.max(maxCellLength, cellText2.length);
        }
        wscolsTable2.push({ wch: maxCellLength + 2 }); // Adding some extra width for padding
      }
      wsTable2["!cols"] = wscolsTable2;

      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Add the worksheets to the workbook
      XLSX.utils.book_append_sheet(wb, wsTable, "PC Data");
      XLSX.utils.book_append_sheet(wb, wsText, "Center Data");
      XLSX.utils.book_append_sheet(wb, wsTable2, "Student Data");

      // Save the workbook as an Excel file
      XLSX.writeFile(
        wb,
        `${responseCenterData.data.centerName}_${formatDate(
          currentDateTime
        )}.xlsx`
      );
      localStorage.setItem("Status", "NULL");

      toast.success("Successfully end the center");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box>
        {user === "CIC" ? (
          <Header
            title="DASHBOARD"
            subtitle={`Hello! ${name}, Welcome to your dashboard`}
            ipAddress={`Your IP : ${ipAddress}`}
          />
        ) : (
          <Header title={title} subtitle={`Hello! Welcome to your dashboard`} />
        )}
      </Box>
      <Box>
        <h3>{formatDate(currentDateTime)}</h3>
      </Box>
      <Box>
        {user === "CIC" && status === "Start" ? (
          <Tooltip title={`${status} The Center`} arrow>
            <IconButton
              onClick={async () => {
                try {
                  const userId = localStorage.getItem("User");
                  const centerId = localStorage.getItem("CenterCode");
                  const response = await setCenterStart(userId, centerId);
                  if (
                    response.data.o_sql_msg ===
                    "CENTER IN CHARGE ALREADY INSERTED LOGIN TIME"
                  ) {
                    setStatus("End");
                    localStorage.setItem(
                      "Status",
                      response.data.centerInChargeAttendanceCode
                    );
                    setStatus("End");
                  } else if (response.data.o_sql_msg === "success") {
                    localStorage.setItem(
                      "Status",
                      response.data.centerInChargeAttendanceCode
                    );
                    setStatus("End");
                    toast.success("Successfully Marked The Attendance.");
                  }

                  console.log(response);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <AlarmAddOutlined />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={`${status} The Center`} arrow>
            <IconButton onClick={handleOpen} disabled={user !== "CIC"}>
              <AlarmOffOutlined />
            </IconButton>
          </Tooltip>
        )}
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
                localStorage.removeItem("Role");
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Are you closing the center?
          </Typography>
          <Box display="flex" justifyContent="space-around" marginTop="30px">
            <Button
              variant="contained"
              type="submit"
              onClick={handleCenterLogout}
              style={{
                backgroundColor: "red",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "white",
                fontSize: "15px",
                marginBottom: "10px",
                color: "red",
              }}
              onClick={handleClose}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Topbar;
