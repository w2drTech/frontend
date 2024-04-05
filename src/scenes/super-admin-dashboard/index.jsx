import { Box, Button } from "@mui/material";
import { allLogout } from "../../services/super-admin/allLogoutService";
import { toast } from "react-toastify";
import React from "react";

import * as XLSX from "xlsx";
import { useEffect } from "react";
import { useState } from "react";
import { getSelectedCenterPCDetails } from "../../services/center-performance-services/getSelectedCenter";
const SuperAdminDashboard = () => {
  const [tableData, setTableData] = useState("");
  // Get today's date
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

  // Call the function with today's date
  useEffect(() => {
    console.log("sad", formattedToday);
    const fetchData = async () => {
      const response = await getSelectedCenterPCDetails("021", formattedToday);
      console.log(response);
      setTableData(response.data);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await allLogout();
      if (response.data.o_sql_msg === "success") {
        toast.success("Successfully logged out all students");
      }
    } catch (error) {
      toast.error("Something went wrong while logging out all students");
    }
  };

  const textDataArray = [
    ["Date", "Opened Time","Closed Time","Worked Time","Student Count","PC Count","PC Performance"],
    ["09-FEB-2024", "13:17","STILL OPEN","0.1 h",1,"1 / 14","0.03 %"],
  ];


  const handleExportToExcel = () => {
    // Create a new worksheet for table data
    const wsTable = XLSX.utils.aoa_to_sheet([
      // Headers for the table
      ["PC ID", "Student Count", "Duration", "PC Performance"],
      // Extracting values from the tableData
      ...tableData.map((row) => [
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

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Add the worksheets to the workbook
    XLSX.utils.book_append_sheet(wb, wsTable, "Table Data");
    XLSX.utils.book_append_sheet(wb, wsText, "Text Data");

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        sx={{
          width: "200px",
          height: "60px",
          fontSize: "25px",
          margin: "50px",
        }}
        onClick={handleLogout}
      >
        Click Me
      </Button>
      <div>
        <button onClick={handleExportToExcel}>Download Excel</button>
      </div>
    </Box>
  );
};

export default SuperAdminDashboard;
