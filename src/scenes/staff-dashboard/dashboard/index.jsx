import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import StatBox from "../../../components/StatBox";
import LineChart from "../../../components/LineChart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getStatBoxData } from "../../../services/statboxDataService";

import "../../../../src/style.css";
import { getExecutiveDashboardLineChartData } from "../../../services/lineChartDataService";

const StaffDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [todayStudent, setTodayStudent] = useState("");
  const [allRegisteredStudents, setAllRegisteredStudents] = useState("");
  const [allRegisteredCenters, setAllRegisteredCenters] = useState("");
  const [workingStudent, setWorkingStudents] = useState("");
  const [workingCenters, setWorkingCenters] = useState("");
  const [computerHour, setComputerHours] = useState("");
  const [lineChartData, setLineChartData] = useState("");
  const [allPcs, setAllPCCount] = useState("");
  const [todayPCs, setTodayPCCount] = useState("");
  var [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStatBoxData = async () => {
      try {
        const response = await getStatBoxData();

        const lineChartDataResponse =
          await getExecutiveDashboardLineChartData();
        setTodayStudent(response.data.dailyStudentCount);
        setWorkingStudents(response.data.currentStudentCount);
        setWorkingCenters(response.data.dailyCenterCount);
        setComputerHours(response.data.dailyComputerHours);
        setAllRegisteredStudents(response.data.allStudentCount);
        setAllRegisteredCenters(response.data.allCenterCount);
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
            <StatBox
              name="liveStudent"
              title="Today PCs"
              progress={`${(todayPCs / allPcs) * 100}`}
              value={todayPCs}
              fullStudentValue={allPcs}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              name="liveCenters"
              title="Live Working Centers"
              progress={`${(workingCenters / allRegisteredCenters) * 100}`}
              value={workingCenters}
              fullStudentValue={allRegisteredCenters}
            />
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
                Computer Hours : {`${computerHour} h`}
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
                area={true}
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

export default StaffDashboard;
