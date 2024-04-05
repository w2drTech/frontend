import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from "react";

const LineChart = ({
  data,
  isDashboard = false,
  leftAxisName,
  bottomAxisName,
  area,
}) => {
  const [y, setY] = useState("");
  const [m, setM] = useState("");
  useEffect(() => {
    var months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth(); // Months are zero-based, so add 1
    var monthName = months[month];
    setY(year);
    setM(monthName);
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },

        legends: {
          text: {
            fill: colors.grey[100],
            fontSize: "13px",
          },
        },

        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 100, bottom: 40, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend:`${bottomAxisName} (${m} - ${y})`, // added
        legendOffset: 26,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: leftAxisName, // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      lineWidth={3}
      enableGridX={false}
      enableSlices={"x"}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      enablePointLabel={true}
      pointBorderWidth={2}
      pointLabel={"y"}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      areaBaselineValue={1}
      motionConfig={"molasses"}
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 3,
          itemDirection: "right-to-left",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
