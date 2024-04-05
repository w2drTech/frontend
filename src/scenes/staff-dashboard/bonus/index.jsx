import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import { tokens } from "../../../theme";
import { useEffect, useState } from "react";
import Loader from "../../global/Loader";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  getGeneratedData,
  getSelectedDateRangeData,
} from "../../../services/staff-services/bonusService";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useDispatch } from "react-redux";
import { SetCurrentPageTopic } from "../../../store/action/headerChange";
const Bonus = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  dispatch(SetCurrentPageTopic("GENERATED RECORDS"));

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState([dayjs(""), dayjs("")]);
  const today = dayjs();
  const handleCellClick = (params) => {
    if (params.field === "topic") {
      console.log(params.row.fromDate);
      window.location.href = `salary-details?id=${params.id}&from=${params.row.fromDate}&to=${params.row.toDate}`;
    }
  };
  const columns = [
    {
      field: "topic",
      headerName: "Generated Record",
      flex: 6,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase", cursor: "pointer" }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "fromDate",
      headerName: "From",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "toDate",
      headerName: "To",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "generateDate",
      headerName: "Generated Date",
      flex: 3,
      cellClassName: "name-column--cell",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const response = await getGeneratedData();
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const handleTableData = async () => {
    setIsLoading(true);
    const startDateString = value[0].$d;
    const startDateObject = new Date(startDateString);

    const startMonth = startDateObject.toLocaleString("default", {
      month: "short",
    });
    const startDay = startDateObject.getDate();
    const startYear = startDateObject.getFullYear();

    const endDateString = value[1].$d;
    const endDateObject = new Date(endDateString);

    const endMonth = endDateObject.toLocaleString("default", {
      month: "short",
    });
    const endDay = endDateObject.getDate();
    const endYear = endDateObject.getFullYear();

    try {
      const response = await getSelectedDateRangeData(
        `${startDay}-${startMonth}-${startYear}`,
        `${endDay}-${endMonth}-${endYear}`
      );
      setIsLoading(false);
      toast.success("Generated your record. View On the table");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Please refresh");
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box m="0 20px">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
              <DemoItem component="DateRangePicker">
                <DateRangePicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  defaultValue={today}
                  disableFuture
                  minDate={dayjs("2024-01-01")}
                  maxDate={dayjs().subtract(1, "day")}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ flex: 2, mt: "6px", ml: "10px" }}>
          <Button
            variant="contained"
            onClick={handleTableData}
            sx={{ background: "red", height: "50px" }}
          >
            Generate
          </Button>
        </Box>
      </Box>
      <Box
        display="grid"
        width="100%"
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
          getRowId={(row) => row.id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onCellClick={handleCellClick}
        />
      </Box>
    </Box>
  );
};

export default Bonus;
