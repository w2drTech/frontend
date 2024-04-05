import {
  Box,
  Typography,
  useTheme,
  Modal,
} from "@mui/material";
import { tokens } from "../../../theme";
import StatBox from "../../../components/StatBox";
import LineChart from "../../../components/LineChart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
//import { getStatBoxData } from "../../services/statboxDataService";

import "../../../../src/style.css";

import {
  getSelectedCenterPCPerformance,
  getSelectedCenterPCPerformanceForCircle,
} from "../../../services/executive-services/getCenterPcPerformance";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getNotMarkedPCs } from "../../../services/center-manager-services/pcService";
const PCPerformanceStats = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const columns = [
    {
      field: "pcsCode",
      headerName: "PC Id",
      flex: 4,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase" }}>{params.value}</Box>
      ),
    },
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [lineChartData, setLineChartData] = useState([]);
  const [allPCs, setAllPCs] = useState("");
  const [todayPCs, setTodayPCs] = useState("");
  const [workingPCs, setWorkingPCs] = useState("");
  var [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [notMarkedPCs, setNotMarkedPCs] = useState("");

  useEffect(() => {
    const fetchStatBoxData = async () => {
      const centerId = localStorage.getItem("CenterCode");
      try {
        const lineChartDataResponse = await getSelectedCenterPCPerformance(
          centerId
        );
        setLineChartData(lineChartDataResponse.data);
        const response = await getSelectedCenterPCPerformanceForCircle(
          centerId
        );
        const notMarkedPCResponse = await getNotMarkedPCs(centerId);
        setNotMarkedPCs(notMarkedPCResponse.data);
        setAllPCs(response.data.allPcCount);
        setTodayPCs(response.data.todayWorkingPCs);
        setWorkingPCs(response.data.currentWorkingPCs);
        const chartData = [
          {
            id: "PC Work Hours",
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
              name="todayPCs"
              title="Today PCs"
              progress={`${(todayPCs / allPCs) * 100}`}
              value={todayPCs}
              fullStudentValue={allPCs}
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
            onClick={handleOpen}
          >
            {/* <Box>
              <Typography variant="h5" padding={"10px"}>
                Last Month Total Attendance : 0
              </Typography>
              <Typography variant="h5" padding={"10px"}>
                Working Students : {`${workingStudent} / ${todayStudent}`}
              </Typography>
            </Box> */}
            <StatBox
              name="currentPCs"
              title="Live Working PCs"
              progress={`${(workingPCs / todayPCs) * 100}`}
              value={workingPCs}
              fullStudentValue={todayPCs}
            />
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
                leftAxisName="PC Work Hours (%)"
                bottomAxisName="Date"
                area={false}
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
                Non-Functional PCs
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
                  rows={notMarkedPCs}
                  getRowId={(row) => row.pcsCode}
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

export default PCPerformanceStats;
