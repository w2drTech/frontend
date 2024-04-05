import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { updateAttendance } from "../../services/studentAttendanceService";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const HomeComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [studentName, setStudentName] = useState("");
  const [attendanceKey, setAttendanceKey] = useState("");
  useEffect(() => {
    const stdName = localStorage.getItem("studentName");
    const atdKey = localStorage.getItem("studentAttendanceKey");
    setStudentName(stdName);
    setAttendanceKey(atdKey);
  });
  // const keepAlive = async () => {
  //   var xhr = new XMLHttpsRequest();
  //   xhr.open("GET", "https://stu.dpedu.online/students/update/student/attendanceOut", true);
  //   xhr.send();
  //   console.log("Requested");
  // };
  // setInterval(keepAlive, 60000);
  const handleAttendanceMark = async () => {
    try {
      const response = await updateAttendance(attendanceKey);
      if (response.data.o_sql_msg === "success") {
        localStorage.removeItem("studentName");
        localStorage.removeItem("studentAttendanceKey");
        window.location = "/";
      } else if (response.data.o_sql_msg === "STUDENT ALREADY LOGGED OUT") {
        toast.error("STUDENT ALREADY LOGGED OUT");
        localStorage.removeItem("studentName");
        localStorage.removeItem("studentAttendanceKey");
        window.location = "/";
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Box sx={{ background: colors.grey[100], height: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="contained"
          style={{
            top: 0,
            fontSize: "20px",
            marginBottom: "10px",
            margin: "10px",
            color: "black",
          }}
        >
          HELLO, {studentName}
        </Typography>
        <Button
          variant="contained"
          type="button"
          onClick={handleAttendanceMark}
          style={{
            right: "30px",
            backgroundColor: "black",
            fontSize: "15px",
            marginBottom: "10px",
            margin: "10px",
          }}
        >
          End Your Session
        </Button>
      </Box>
      {/* <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: 0,
          textAlign: "center",
          maxWidth: "800px",
          left: 250,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#830000",
            textAlign: "center",
            fontFamily: "Helvetica, sans-serif",
          }}
        >
          Productivity Monitoring System
        </Typography>
        <Typography variant="h2" sx={{ color: "#830000", textAlign: "center" }}>
          ඵලදායිතා අධීක්ෂණ පද්ධතිය 2024
        </Typography>
      </Box> */}
      <Box sx={{ display: "flex", marginLeft: "100px" }}>
        <img
          style={{ width: "550px", marginRight: "100px" }}
          src="Productivity Monitoring System .png"
          alt=""
        />

        <Box display="grid" alignItems="center">
          <Typography
            sx={{ textAlign: "center" }}
            color="black"
            gutterBottom
            variant="h1"
          >
            Useful links
          </Typography>
          <Box>
            <a href="https://dpcode.lk/" target="_blank">
              <Button variant="contained" color="error" sx={{ width: "300px" }}>
                <IconButton sx={{ display: "flex" }}>
                  <img
                    src="../../../assets/dpcoding.png"
                    alt="DP coding logo"
                    width="100"
                    height="50"
                  />
                </IconButton>
                <Typography variant="h4">To DP Coding</Typography>
              </Button>
            </a>
          </Box>
          <Box>
            <a
              href="https://outlook.office365.com/mail/?JitExp=1"
              target="_blank"
            >
              <Button variant="contained" color="error" sx={{ width: "300px" }}>
                <IconButton>
                  <img
                    src="../../../assets/outlooklogo.png"
                    alt="Your Image"
                    width="50"
                    height="50"
                  />
                </IconButton>
                <Typography variant="h4">To Outlook Website</Typography>
              </Button>
            </a>
          </Box>
          <Box>
            <a href="https://studio.code.org/users/sign_in" target="_blank">
              <Button variant="contained" color="error" sx={{ width: "300px" }}>
                <IconButton>
                  <img
                    src="../../../assets/code.png"
                    alt="Your Image"
                    width="50"
                    height="50"
                  />
                </IconButton>
                <Typography variant="h4">To code.org website</Typography>
              </Button>
            </a>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          position: "absolute",
          display: "flex",
          bottom: 0,
          justifyContent: "center",
          left: 600,
        }}
      >
        <Typography variant="body3" color="black" align="center">
          {"Copyright © "}
          <a
            style={{ color: "black" }}
            href="https://dpeducation.lk/"
            target="_blank"
          >
            DP Education
          </a>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeComponent;
/*
  <Box sx={{}}>
        <Box sx={{}}>
          <Typography
            variant="contained"
            style={{
              top: 0,
              position: "absolute",
              fontSize: "20px",
              marginBottom: "10px",
              margin: "10px",
            }}
          >
            {studentName}
          </Typography>

          <Button
            variant="contained"
            type="button"
            onClick={handleAttendanceMark}
            style={{
              display: "flex",
              position: "absolute",
              right: "30px",
              backgroundColor: "black",
              fontSize: "15px",
              marginBottom: "10px",
              margin: "10px",
              width: "100px",
            }}
          >
            Logout
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          
        </Box>
      </Box>*/
/*      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img style={{ width: "400px" }} src="IT campus Sinhala.png" alt="" />
        <img
          style={{ width: "300px", marginBottom: "70px", marginLeft: "50px" }}
          src="IT campus en.png"
          alt=""
        />
      </Box> */

/*<img style={{ width: "400px" }} src="IT campus Sinhala.png" alt="" />
        <Box display="grid" justifyContent="center" alignItems="center">
          <Typography
            sx={{ textAlign: "center" }}
            color="black"
            gutterBottom
            variant="h1"
          >
            Useful links
          </Typography>
          <Box >
            <a href="https://dpcode.lk/" target="_blank">
              <Button
                variant="contained"
                color="error"
                sx={{ width: "300px", height: "70px" }}
              >
                <IconButton sx={{ display: "flex" }}>
                  <img
                    src="../../../assets/dpcoding.png"
                    alt="DP coding logo"
                    width="100"
                    height="50"
                  />
                </IconButton>
                <Typography variant="h4">To DP Coding</Typography>
              </Button>
            </a>
          </Box>
          <Box >
            <a
              href="https://outlook.office365.com/mail/?JitExp=1"
              target="_blank"
            >
              <Button
                variant="contained"
                color="error"
                sx={{ width: "300px", height: "70px" }}
              >
                <IconButton>
                  <img
                    src="../../../assets/outlooklogo.png"
                    alt="Your Image"
                    width="50"
                    height="50"
                  />
                </IconButton>
                <Typography variant="h4">To Outlook Website</Typography>
              </Button>
            </a>
          </Box>
          <Box>
            <a href="https://studio.code.org/users/sign_in" target="_blank">
              <Button
                variant="contained"
                color="error"
                sx={{ width: "300px", height: "70px" }}
              >
                <IconButton>
                  <img
                    src="../../../assets/code.png"
                    alt="Your Image"
                    width="50"
                    height="50"
                  />
                </IconButton>
                <Typography variant="h4">To code.org website</Typography>
              </Button>
            </a>
          </Box>
        </Box>
        <img
          style={{ width: "300px", marginBottom: "70px", marginLeft: "50px" }}
          src="IT campus en.png"
          alt=""
        />
      </Box>*/
