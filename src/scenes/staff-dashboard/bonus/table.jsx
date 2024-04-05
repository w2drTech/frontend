import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

const TableRenderer = ({columns,data,id,onCellClick}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="grid"
      width="100%"
      height="60vh"
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
        getRowId={(row) => row.centerCode}
        //getRowId={data.centerCode}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        onCellClick={onCellClick}
      />
    </Box>
  );
};

export default TableRenderer;
