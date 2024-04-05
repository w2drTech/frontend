import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import LineChart from "../../components/LineChart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getStatBoxData } from "../../services/statboxDataService";

import "../../../src/style.css";

import { getSelectedCenterAttendance, getSelectedCenterAttendanceForCircle } from "../../services/getCenterAttendanceDetails";
const CenterInchargeDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [todayStudent, setTodayStudent] = useState("");
  const [allRegisteredStudents, setAllRegisteredStudents] = useState("");
  const [workingStudent, setWorkingStudents] = useState("");

  const [lineChartData, setLineChartData] = useState("");
  const [allPcs, setAllPCCount] = useState("");
  const [todayPCs, setTodayPCCount] = useState("");
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatBoxData = async () => {
      const centerId = localStorage.getItem("CenterCode");
      try {
        const lineChartDataResponse = await getSelectedCenterAttendance(
          centerId
        );
        const response = await getSelectedCenterAttendanceForCircle(centerId);
        setTodayStudent(response.data.todayStudentCount);
        setWorkingStudents(response.data.currentStudentCount);
        setAllRegisteredStudents(response.data.allStudentCount);
        setAllPCCount(response.data.allPCsCount);
        setTodayPCCount(response.data.dailyPCsCount);
        const chartData = [
          {
            id: "Total Students",
            color: tokens("dark").greenAccent[500],
            data: lineChartDataResponse.data,
          },
        ];
        setLineChartData(chartData);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchStatBoxData().then(() => setLoading((loading = false)));
  }, []);
  return (
    <Box m="0 20px">
      {loading === false ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              name="todayStudent"
              title="Today Students"
              progress={`${(todayStudent / allRegisteredStudents) * 100}`}
              value={todayStudent}
              fullStudentValue={allRegisteredStudents}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* <StatBox
              name="liveStudent"
              title="Today PC Hours"
              progress={`${(todayPCs / allPcs) * 100}`}
              value={todayPCs}
              fullStudentValue={allPcs}
            /> */}
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* <StatBox
              name="liveCenters"
              title="Live Working Centers"
              progress={`${(workingCenters / allRegisteredCenters) * 100}`}
              value=""
              fullStudentValue=""
            /> */}
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <Typography variant="h5" padding={"10px"}>
                Last Month Total Attendance : 0
              </Typography>
              <Typography variant="h5" padding={"10px"}>
                Working Students : {`${workingStudent} / ${todayStudent}`}
              </Typography>
            </Box>
          </Box>
          <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box height="345px" m="-20px 0 0 0">
              <LineChart
                isDashboard={true}
                data={lineChartData}
                leftAxisName="Student Count"
                bottomAxisName="Date"
                area={false}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <div id="cover-spin"></div>
      )}
    </Box>
  );
};

export default CenterInchargeDashboard;
