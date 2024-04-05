import { Box, Modal, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import Loader from "../global/Loader";
import { getAllPerformance } from "../../services/center-performance-services/getAllPerformanceService";
import {
  getSelectedCenterPCDetails,
  getSelectedCenterPerformance,
} from "../../services/center-performance-services/getSelectedCenter";
import { useDispatch } from "react-redux";
import { SetCurrentPageTopic } from "../../store/action/headerChange";
const CenterPerformance = () => {

  const dispatch = useDispatch();
  dispatch(SetCurrentPageTopic("PERFORMANCE DETAILS"));

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "scroll",
    width: "1000px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date, setDate] = useState("");
  const [openedTime, setOpenedTime] = useState("");
  const [closedTime, setClosedTime] = useState("");
  const [duration, setDuration] = useState("");
  const [todayPCs, setTodayPCs] = useState("");
  const [allPCs, setAllPCs] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [pcPercentage, setPcPercentage] = useState("");
  const [centerName, setCenterName] = useState("");
  const [pcData, setPcData] = useState("");

  useEffect(() => {
    const fetchAllPerformanceData = async () => {
      const response = await getAllPerformance();
      setData(response.data);
      setIsLoading(false);
    };
    fetchAllPerformanceData();
  }, []);
  const handleCellClick = async (params) => {
    if (params.field === "centerName") {
      console.log("dj",params.row.centerCode)
      setDate(params.row.openDate);
      setOpenedTime(params.row.startTime);
      setClosedTime(params.row.endTime);
      setDuration(params.row.duration);
      setCenterName(params.row.centerName);
      try {
       
        const response = await getSelectedCenterPerformance(
          params.row.centerCode,
          params.row.openDate,
          params.row.status
          );
     
        const tableResponse = await getSelectedCenterPCDetails(
          params.row.centerCode,
          params.row.openDate
        );
        
        setPcData(tableResponse.data);
        setAllPCs(response.data.allPcCount);
        setTodayPCs(response.data.WorkedPCs);
        setStudentCount(response.data.studentCount);
        setPcPercentage(response.data.pcsPerformance);
        
        handleOpen();
      } catch (error) {}
    }
  };
  const columns = [
    {
      field: "openDate",
      headerName: "Date",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "centerName",
      headerName: "Center Name",
      flex: 6,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase", cursor: "pointer" }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "startTime",
      headerName: "Opened Time",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "endTime",
      headerName: "Closed Time",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 2,
      cellClassName: "name-column--cell",
    },
  ];
  const inColumns = [
    {
      field: "pcCode",
      headerName: "PC Id",
      flex: 6,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase", cursor: "pointer" }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "durationInMin",
      headerName: "Worked Time",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "pcPerformance",
      headerName: "Performance",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "studentCount",
      headerName: "Student Count",
      flex: 2,
      cellClassName: "name-column--cell",
    },
  ];
  return (
    <Box m="0 20px">
      {isLoading ? (
        <Loader />
      ) : (
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
            rows={data}
            getRowId={(row) => row.attendanceCode}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            onCellClick={handleCellClick}
          />
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography id="modal-modal-description" variant="h3">
              {centerName}
            </Typography>
          </Box>
          <Box display="flex">
            <Box
              sx={{
                textAlign: "left",
                display: "grid",
                justifyContent: "space-evenly",
              }}
            >
              <Typography variant="h5">Date</Typography>
              <Typography variant="h5">Opened Time</Typography>
              <Typography variant="h5">Closed Time</Typography>
              <Typography variant="h5">Worked Time</Typography>
              <Typography variant="h5">Student Count</Typography>
              <Typography variant="h5">PC Count</Typography>
              <Typography variant="h5">PC Performance</Typography>
            </Box>
            <Box
              sx={{
                textAlign: "right",
                display: "grid",
                justifyContent: "space-evenly",
                width: "50px",
              }}
            >
              <Typography variant="h5">:</Typography>
              <Typography variant="h5">:</Typography>
              <Typography variant="h5">:</Typography>
              <Typography variant="h5">:</Typography>
              <Typography variant="h5">:</Typography>
              <Typography variant="h5">:</Typography>
              <Typography variant="h5">:</Typography>
            </Box>
            <Box
              sx={{
                textAlign: "left",
                display: "grid",
                justifyContent: "space-evenly",
              }}
            >
              <Typography variant="h5">{date}</Typography>
              <Typography variant="h5">{openedTime}</Typography>
              <Typography variant="h5">{closedTime}</Typography>
              <Typography variant="h5">{`${duration} h`}</Typography>
              <Typography variant="h5">{studentCount}</Typography>
              <Typography variant="h5">{`${todayPCs} / ${allPCs}`}</Typography>
              <Typography variant="h5">{`${pcPercentage} %`}</Typography>
            </Box>
          </Box>
          {isLoading ? (
            <Loader />
          ) : (
            <Box
              display="grid"
              height="58vh"
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
                rows={pcData}
                getRowId={(row) => row.pcCode}
                columns={inColumns}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default CenterPerformance;
