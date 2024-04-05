import { Box, Typography } from "@mui/material";
import queryString from "query-string";
import { useEffect, useState } from "react";
import {
  getFinalSalaryData,
  getOpenHoursData,
  getPCData,
  getPerformanceData,
} from "../../../services/staff-services/bonusService";
import TableRenderer from "./table";
import Loader from "../../global/Loader";
import { useDispatch } from "react-redux";
import { SetCurrentPageTopic } from "../../../store/action/headerChange";

const SalaryDetails = () => {
  const [openHoursBonusData, setOpenHoursBonusData] = useState([]);
  const [performanceBonusData, setPerformanceBonusData] = useState([]);
  const [pcBonusData, setPcBonusData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const dispatch = useDispatch();
  dispatch(SetCurrentPageTopic(`${from} TO ${to} DETAILS`));
  const openHoursBonusTableColumns = [
    {
      field: "centerName",
      headerName: "Center Name",
      flex: 4,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase" }}>{params.value}</Box>
      ),
    },
    {
      field: "hoursAvg",
      headerName: "Hours Avg",
      flex: 3,
    },
    {
      field: "grading",
      headerName: "Grading",
      flex: 3,
    },
    {
      field: "bonus",
      headerName: "Amount",
      flex: 3,
    },
  ];
  const performanceBonusTableColumns = [
    {
      field: "centerName",
      headerName: "Center Name",
      flex: 4,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase" }}>{params.value}</Box>
      ),
    },
    {
      field: "pcPerformance",
      headerName: "Percentage",
      flex: 3,
    },
    {
      field: "grading",
      headerName: "Grading",
      flex: 3,
    },
    {
      field: "bonus",
      headerName: "Amount",
      flex: 3,
    },
  ];
  const pcBonusTableColumns = [
    {
      field: "centerName",
      headerName: "Center Name",
      flex: 4,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase" }}>{params.value}</Box>
      ),
    },
    {
      field: "totalPcCount",
      headerName: "Total PCs",
      flex: 3,
    },
    {
      field: "pcCountAbove21",
      headerName: "PC count above 21",
      flex: 3,
    },
    {
      field: "bonus",
      headerName: "Total amount",
      flex: 3,
    },
  ];
  const finalColumns = [
    {
      field: "centerName",
      headerName: "Center Name",
      flex: 4,
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase" }}>{params.value}</Box>
      ),
    },
    {
      field: "basicSalary",
      headerName: "Basic",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneAllowance",
      headerName: "Phone Allowance",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "hourlyAverage",
      headerName: "Hourly Average",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "hourlyBonus",
      headerName: "Hourly Additional Payment",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "pcsPerformance",
      headerName: "Performance Average",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "performanceBonus",
      headerName: "Performance Additional Payment",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "totalPcsCount",
      headerName: "Total Computer Count",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "additionalPcsCount",
      headerName: "Additional Computers",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "additionalPcsBonusAmount",
      headerName: "Computer Additional Payment Amount",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "totalBonus",
      headerName: "Total Additional Payment",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "finalSalary",
      headerName: "Final Monthly Payment",
      flex: 3,
      cellClassName: "name-column--cell",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const parsed = queryString.parse(window.location.search);
      setFrom(parsed.from);
      setTo(parsed.to);
      const openHoursBonusDataResponse = await getOpenHoursData(parsed.id);
      const performanceBonusDataResponse = await getPerformanceData(parsed.id);
      const pcBonusDataResponse = await getPCData(parsed.id);
      const finalSalaryResponse = await getFinalSalaryData(parsed.id);

      setOpenHoursBonusData(openHoursBonusDataResponse.data);
      setPerformanceBonusData(performanceBonusDataResponse.data);
      setPcBonusData(pcBonusDataResponse.data);
      setFinalData(finalSalaryResponse.data);
      console.log(pcBonusDataResponse.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box m="0 20px">
      <Typography variant="h2" sx={{ textAlign: "center", padding: "20px" }}>
        HOURLY ALLOWANCE RATE TABLE
      </Typography>
      <TableRenderer
        columns={openHoursBonusTableColumns}
        data={openHoursBonusData}
        id={openHoursBonusData.centerCode}
        onCellClick={""}
      />
      <Typography variant="h2" sx={{ textAlign: "center", padding: "20px" }}>
        PERFORMANCE BASED ALLOWANCE TABLE
      </Typography>
      <TableRenderer
        columns={performanceBonusTableColumns}
        data={performanceBonusData}
        id={performanceBonusData.centerCode}
        onCellClick={""}
      />
      <Typography variant="h2" sx={{ textAlign: "center", padding: "20px" }}>
        PC BASED ALLOWANCE TABLE
      </Typography>
      <TableRenderer
        columns={pcBonusTableColumns}
        data={pcBonusData}
        id={pcBonusData.centerCode}
        onCellClick={""}
      />
      <Typography variant="h2" sx={{ textAlign: "center", padding: "20px" }}>
        TOTAL COMPENSATION AND BONUS SUMMARY
      </Typography>
      <TableRenderer
        columns={finalColumns}
        data={finalData}
        id={pcBonusData.centerCode}
        onCellClick={""}
      />
    </Box>
  );
};

export default SalaryDetails;
