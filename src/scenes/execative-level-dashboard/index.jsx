import { Box, Typography, useTheme, Modal } from "@mui/material";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import LineChart from "../../components/LineChart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getStatBoxData } from "../../services/statboxDataService";
import "../../../src/style.css";
import {
  getExecutiveDashboardLineChartData,
  getWorkingCentersData,
} from "../../services/lineChartDataService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { SetCurrentPageTopic } from "../../store/action/headerChange";

const ExecutiveLevelDashboard = () => {
  const dispatch = useDispatch();
  dispatch(SetCurrentPageTopic("MAIN DASHBOARD"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1000px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [workingCentersDetails, setWorkingCentersDetails] = useState("");

  useEffect(() => {
    const fetchStatBoxData = async () => {
      try {
        const response = await getStatBoxData();

        const lineChartDataResponse =
          await getExecutiveDashboardLineChartData();

        const workingCentersDetailsResponse = await getWorkingCentersData();
        setWorkingCentersDetails(workingCentersDetailsResponse.data);
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

  const columns = [
    {
      field: "centerName",
      headerName: "Center Name",
      flex: 5,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase" }}>{params.value}</Box>
      ),
    },
    {
      field: "loginTime",
      headerName: "Opened Time",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "logoutTime",
      headerName: "Closed Time",
      flex: 2,
      renderCell: (params) => (
        <Typography variant="body2" color="textPrimary" fontSize={"15px"}>
          {params.row.logoutTime === null
            ? "Still Open"
            : params.row.logoutTime}
        </Typography>
      ),
      cellClassName: "name-column--cell",
    },
    {
      field: "studentCount",
      headerName: "Today Students",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "pcCount",
      headerName: "Today PCs",
      flex: 2,
      cellClassName: "name-column--cell",
    },
  ];

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
            onClick={handleOpen}
            style={{ cursor: "pointer" }}
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
            height={"350px"}
            backgroundColor={colors.primary[400]}
          >
            <Box height="345px" m="0 0 0 0">
              <LineChart
                isDashboard={true}
                data={lineChartData}
                leftAxisName="Student Count"
                bottomAxisName="Date"
                area={true}
              />
            </Box>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h2"
                component="h2"
              ></Typography>
              <Typography id="modal-modal-description" variant="h3" sx={{}}>
                Today's Centers Status
              </Typography>
              <Box
                display="grid"
                height="78vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                    fontSize: "15px",
                  },
                  "& .name-column--cell": {
                    color: colors.primary[100],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    border: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.redAccent[100]} !important`,
                  },
                }}
              >
                <DataGrid
                  rows={workingCentersDetails}
                  getRowId={(row) => row.attendanceCode}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                />
              </Box>
            </Box>
          </Modal>
        </Box>
      ) : (
        <div id="cover-spin"></div>
      )}
    </Box>
  );
};

export default ExecutiveLevelDashboard;
