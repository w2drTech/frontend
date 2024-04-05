import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCenterTodayStudents,
  updateStudentAttendance,
} from "../../../services/center-manager-services/getStudentData";
import Loader from "../../global/Loader";
const DailyStudentOverview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const centerId = localStorage.getItem("CenterCode");
    const fetchAllStudentData = async () => {
      try {
        const response = await getCenterTodayStudents(centerId);
        console.log(response)
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchAllStudentData();
  }, []);
  const handleUpdate = async (id) => {
    try {
      const selectedData = data.find(
        (element) => element.attendanceCode === id
      );
      setSelectedData(selectedData);
      const response = await updateStudentAttendance(
        selectedData.attendanceCode
      );
      if (response.data.o_sql_msg === "success") {
        toast.success("Successfully logged out the student.");
      }
    } catch (error) {
      toast.error("Something went wrong while login out the student");
      console.log(error)
    }
  };
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 4,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase" }}>{params.value}</Box>
      ),
    },
    {
      field: "pcCode",
      headerName: "PC Id",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "loginTime",
      headerName: "Login Time",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "logoutTime",
      headerName: "Logout Time",
      flex: 3,
      type: "number",
      headerAlign: "left",
      cellClassName: "name-column--cell",
      align: "left",
      renderCell: (params) => (
        <Typography variant="body2" color="textPrimary" fontSize={"15px"}>
          {params.row.logoutTime === null
            ? "Still Working"
            : params.row.logoutTime}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Status",
      flex: 2,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => handleUpdate(params.id)}
            variant="contained"
            style={{
              backgroundColor: params.row.logoutTime != null ? "#d84705" : "#4cceac",
              color: "black",
            }}
            disabled={params.row.logoutTime != null}
          >
            {params.row.logoutTime != null ? "Logged Out" : "Logout"}
          </Button>
        </Box>
      ),
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
          />
        </Box>
      )}
    </Box>
  );
};

export default DailyStudentOverview;
