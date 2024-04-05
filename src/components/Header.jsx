import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from "react";

const Header = ({ title, subtitle,ipAddress }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mr: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {ipAddress}
      </Typography>
    </Box>
  );
};

export default Header;
