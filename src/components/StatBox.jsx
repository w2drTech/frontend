import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, progress, value, fullStudentValue }) => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  return (
    <Box width="100%" m="0 30px">
      <Typography
        variant="h5"
        sx={{ color: colors.grey[100] }}
        textAlign="center"
      >
        {title}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="5px"
      >
        <ProgressCircle progress={progress} />
        <Typography
          variant="h4"
          sx={{ color: colors.grey[100], paddingLeft: "5px" }}
        >
          {`${value}/${fullStudentValue}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
