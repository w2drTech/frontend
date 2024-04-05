import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import LineChart from "../../../components/LineChart";
import { toast } from "react-toastify";
import { getProvinces } from "../../../services/areaService";
import { getDistricts } from "../../../services/districtService";
import { getCenters } from "../../../services/centerService";
import "../../../../src/style.css";
import StatBox from "../../../components/StatBox";
import {
  getAllCenters,
  getSelectedCenterAttendanceForCircle,
  getSelectedCenterMoreToGoDetails,
  getSelectedCenterOpenTimeChartData,
} from "../../../services/getCenterAttendanceDetails";
import {
  getLineChartDataForPCPerformance,
  getPCPerformanceStatBoxData,
} from "../../../services/executive-services/pcPerformanceService";
import {
  getSelectedProvincePCPerformance,
  getSelectedProvincePCPerformanceForCircle,
} from "../../../services/executive-services/getProvincePcPerformance";
import {
  getSelectedDistrictPCPerformance,
  getSelectedDistrictPCPerformanceForCircle,
} from "../../../services/executive-services/getDistrictPcPerformance";
import {
  getSelectedCenterPCPerformance,
  getSelectedCenterPCPerformanceForCircle,
  getSelectedCenterPCPerformanceForDateRange,
} from "../../../services/executive-services/getCenterPcPerformance";
import { useDispatch } from "react-redux";
import { SetCurrentPageTopic } from "../../../store/action/headerChange";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { getStatBoxData } from "../../../services/statboxDataService";

const PCWorkHours = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  dispatch(SetCurrentPageTopic("CENTER DASHBOARD"));

  const [value, setValue] = useState([dayjs(""), dayjs("")]);
  const today = dayjs();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [centers, setCenters] = useState([]);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [center, setCenter] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  var [loading, setLoading] = useState(true);
  const [lineChartData, setLineChartData] = useState([]);
  const [openLineChartData, setOpenLineChartData] = useState([]);
  const [allPCCount, setAllPCs] = useState("");
  const [todayWorkingPCs, setTodayWorkingPCs] = useState("");
  const [currentWorkingPCs, setCurrentWorkingPCs] = useState("");
  const [allCenters, setAllCenters] = useState([]);
  const [regStudentCount, setRegStudentsCount] = useState("");
  const [todayStudentCount, setTodayStudentsCount] = useState("");
  const [selectedOptionCenter, setSelectedOptionCenter] = useState("");
  const [startTimeH, setStartTimeH] = useState("");
  const [startTimeM, setStartTimeM] = useState("");
  const [performance, setPerformance] = useState("");

  const handleProvinceChange = async (event) => {
    setProvince(event.target.value);
    document.getElementById("test").style.display = "none";

    document.getElementById("district").innerHTML = "District";
    document.getElementById("center").innerHTML = "Center";
    document.getElementById("search").innerHTML = "Search Center By Name";

    const responseOfCircleData =
      await getSelectedProvincePCPerformanceForCircle(event.target.value);

    setAllPCs(responseOfCircleData.data.allPcCount);
    setTodayWorkingPCs(responseOfCircleData.data.todayWorkingPCs);
    setCurrentWorkingPCs(responseOfCircleData.data.currentWorkingPCs);

    const response = await getSelectedProvincePCPerformance(event.target.value);
    const districtArrays = {};

    response.data.forEach((item) => {
      const district = item.district;
      if (!districtArrays[district]) {
        districtArrays[district] = {
          id: district.toLowerCase(), // Convert district name to lowercase for the id
          color: tokens("dark").greenAccent[500], // Function to get a random HSL color
          data: [],
        };
      } // Push the current item to the corresponding district array
      districtArrays[district].data.push({
        x: item.date,
        y: item.performance,
      });
    });

    const allUniqueDates = Array.from(
      new Set(response.data.map((item) => item.date))
    );
    Object.values(districtArrays).forEach((district) => {
      const districtDates = district.data.map((dataPoint) => dataPoint.x);

      allUniqueDates.forEach((date) => {
        if (!districtDates.includes(date)) {
          district.data.push({
            x: date,
            y: 0,
          });
        }
      });
      district.data.sort((a, b) => {
        const dateA = allUniqueDates.indexOf(a.x);
        const dateB = allUniqueDates.indexOf(b.x);
        return dateA - dateB;
      });
      // Sort the data array by date
      //district.data.sort((a, b) => a.x - b.x);
    });
    const uniqueDistrictIDs = Object.keys(districtArrays);

    // Define an array of colors for each district dynamically
    const districtColors = {};
    uniqueDistrictIDs.forEach((districtID, index) => {
      districtColors[districtID] =
        tokens("dark").greenAccent[500 + index * 100];
      // Adjust the color generation as needed
    });

    // Function to generate a random HSL color
    function getRandomColor() {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 50%)`;
    }

    // Use districtColors for each district array in districtArrays
    Object.values(districtArrays).forEach((district) => {
      district.color = districtColors[district.id] || getRandomColor();
    });
    // Convert the object to an array of values
    const resultArray = Object.values(districtArrays);
    setLineChartData(resultArray);
  };
  const handleDistrictChange = async (event) => {
    setDistrict(event.target.value);
    const responseOfCircleData =
      await getSelectedDistrictPCPerformanceForCircle(event.target.value);
    setAllPCs(responseOfCircleData.data.allPcCount);
    setTodayWorkingPCs(responseOfCircleData.data.todayWorkingPCs);
    setCurrentWorkingPCs(responseOfCircleData.data.currentWorkingPCs);
    const response = await getSelectedDistrictPCPerformance(event.target.value);

    const centersArray = {};

    response.data.forEach((item) => {
      const center = item.centerName;

      if (!centersArray[center]) {
        centersArray[center] = {
          id: center.toLowerCase(), // Convert center name to lowercase for the id
          color: tokens("dark").greenAccent[500], // Function to get a random HSL color
          data: [],
        };
      } // Push the current item to the corresponding center array
      centersArray[center].data.push({
        x: item.date,
        y: item.performance,
      });
    });
    const allUniqueDates = Array.from(
      new Set(response.data.map((item) => item.date))
    );
    // Step 2: Ensure each district has data for all unique dates
    Object.values(centersArray).forEach((district) => {
      const districtDates = district.data.map((dataPoint) => dataPoint.x);

      allUniqueDates.forEach((date) => {
        if (!districtDates.includes(date)) {
          district.data.push({
            x: date,
            y: 0,
          });
        }
      });
      district.data.sort((a, b) => {
        const dateA = allUniqueDates.indexOf(a.x);
        const dateB = allUniqueDates.indexOf(b.x);
        return dateA - dateB;
      });
      // Sort the data array by date
      //district.data.sort((a, b) => a.x - b.x);
    });
    const uniqueDistrictIDs = Object.keys(centersArray);

    // Define an array of colors for each district dynamically
    const districtColors = {};
    uniqueDistrictIDs.forEach((districtID, index) => {
      districtColors[districtID] =
        tokens("dark").greenAccent[500 + index * 100];
      // Adjust the color generation as needed
    });

    // Function to generate a random HSL color
    function getRandomColor() {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 50%)`;
    }

    // Use districtColors for each district array in districtArrays
    Object.values(centersArray).forEach((district) => {
      district.color = districtColors[district.id] || getRandomColor();
    });
    // Convert the object to an array of values
    const resultArray = Object.values(centersArray);
    setLineChartData(resultArray);
  };
  const handleCenterChange = async (event) => {
    setCenter(event.target.value);
    const responseOfCircleData = await getSelectedCenterPCPerformanceForCircle(
      event.target.value
    );
    const studentCountResponse = await getSelectedCenterAttendanceForCircle(
      event.target.value
    );
    const response = await getSelectedCenterPCPerformance(event.target.value);
    setAllPCs(responseOfCircleData.data.allPcCount);
    setTodayWorkingPCs(responseOfCircleData.data.todayWorkingPCs);
    setCurrentWorkingPCs(responseOfCircleData.data.currentWorkingPCs);
    setRegStudentsCount(studentCountResponse.data.allStudentCount);
    setTodayStudentsCount(studentCountResponse.data.todayStudentCount);
    const chartDataForCenter = [
      {
        id: "PC Performance",
        color: tokens("dark").greenAccent[500],
        data: response.data,
      },
    ];
    setLineChartData(chartDataForCenter);
    document.getElementById("test").style.display = "inline-block";
    document.getElementById("center-datePicker").style.display = "inline-block";
    document.getElementById("performance-chart-container").style.height =
      "400px";
  };
  useEffect(() => {
    const fetchLineChartData = async () => {
      try {
        const response = await getPCPerformanceStatBoxData();

        const lineChartDataResponse = await getLineChartDataForPCPerformance();
        const allCentersListResponse = await getAllCenters();
        const responseStat = await getStatBoxData();
        setRegStudentsCount(responseStat.data.allStudentCount);
        setTodayStudentsCount(responseStat.data.dailyStudentCount);
        setAllPCs(response.data.allPcCount);
        setTodayWorkingPCs(response.data.todayWorkingPCs);
        setCurrentWorkingPCs(response.data.currentWorkingPCs);
        setAllCenters(allCentersListResponse.data);
        const chartData = [
          {
            id: "PC Performance",
            color: tokens("dark").greenAccent[500],
            data: lineChartDataResponse.data,
          },
        ];

        setLineChartData(chartData);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchLineChartData().then(() => setLoading((loading = false)));
  }, []);
  useEffect(() => {
    const fetchProvinceData = async () => {
      try {
        const response = await getProvinces();
        setProvinces(response.data);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchProvinceData();
  }, []);
  useEffect(() => {
    const fetchDistrictData = async () => {
      if (selectedProvince) {
        try {
          const response = await getDistricts(selectedProvince); // You'll need a function to fetch districts based on the selected province
          setDistricts(response.data); // Assuming response is an array of districts
        } catch (error) {
          toast.error("Error fetching data");
        }
      }
    };

    fetchDistrictData();
  }, [selectedProvince]);
  useEffect(() => {
    const fetchCenterData = async () => {
      if (selectedProvince) {
        try {
          const response = await getCenters(selectedDistrict); // You'll need a function to fetch districts based on the selected province
          setCenters(response.data); // Assuming response is an array of districts
        } catch (error) {
          toast.error("Error fetching data");
        }
      }
    };

    fetchCenterData();
  }, [selectedDistrict]);

  const handleSelect = async (selectedOption) => {
    if (selectedOption) {
      setSelectedOptionCenter(selectedOption.centerCode);
      try {
        const responseOfCircleData =
          await getSelectedCenterPCPerformanceForCircle(
            selectedOption.centerCode
          );
        const response = await getSelectedCenterPCPerformance(
          selectedOption.centerCode
        );
        const chartDataForCenter = [
          {
            id: "PC Performance",
            color: tokens("dark").greenAccent[500],
            data: response.data,
          },
        ];
        const studentCountResponse = await getSelectedCenterAttendanceForCircle(
          selectedOption.centerCode
        );
        const centerOpenDataResponse = await getSelectedCenterOpenTimeChartData(
          selectedOption.centerCode
        );
        const chartDataForOpen = [
          {
            id: "Open Hours",
            color: tokens("dark").greenAccent[500],
            data: centerOpenDataResponse.data,
          },
        ];
        console.log("as", centerOpenDataResponse);
        try {
          const centerDetailsResponse = await getSelectedCenterMoreToGoDetails(
            selectedOption.centerCode
          );
          console.log(centerDetailsResponse);
          function parseTime(timeString) {
            const [hours, minutes] = timeString.split(":").map(Number);
            return { hours, minutes };
          }
          function getCurrentTime() {
            const now = new Date();
            return { hours: now.getHours(), minutes: now.getMinutes() };
          }
          const { hours, minutes } = parseTime(
            centerDetailsResponse.data.startTime
          );
          function addTime(timeObj, hoursToAdd, minutesToAdd) {
            const totalMinutes =
              timeObj.hours * 60 +
              timeObj.minutes +
              hoursToAdd * 60 +
              minutesToAdd;
            const hours = Math.floor(totalMinutes / 60) % 24;
            const minutes = totalMinutes % 60;
            return { hours, minutes };
          }
          const endTime = addTime({ hours, minutes }, 14, 0);

          setStartTimeH(endTime.hours - getCurrentTime().hours);
          setStartTimeM(endTime.minutes - getCurrentTime().minutes);
          setPerformance(
            Math.floor(90 - centerDetailsResponse.data.performance).toFixed(1)
          );
        } catch (error) {
          if (error.response.status === 500) {
            toast.error("Center not started");
          }
        }

        setRegStudentsCount(studentCountResponse.data.allStudentCount);
        setTodayStudentsCount(studentCountResponse.data.todayStudentCount);
        setAllPCs(responseOfCircleData.data.allPcCount);
        setTodayWorkingPCs(responseOfCircleData.data.todayWorkingPCs);
        setCurrentWorkingPCs(responseOfCircleData.data.currentWorkingPCs);
        setLineChartData(chartDataForCenter);
        setOpenLineChartData(chartDataForOpen);
        document.getElementById("test").style.display = "inline-block";

        document.getElementById("center-datePicker").style.display =
          "inline-block";
        document.getElementById("performance-chart-container").style.height =
          "400px";

        document.getElementById("province").innerHTML =
          selectedOption.provinceName;
        document.getElementById("district").innerHTML =
          selectedOption.districtName;
        document.getElementById("center").innerHTML = selectedOption.centerName;
      } catch (error) {
        toast.error("Error fetching data.");
      }
    } else {
      document.getElementById("test").style.display = "none";
      document.getElementById("center-datePicker").style.display = "none";
      document.getElementById("performance-chart-container").style.height =
        "320px";
      try {
        const response = await getPCPerformanceStatBoxData();

        const lineChartDataResponse = await getLineChartDataForPCPerformance();
        const allCentersListResponse = await getAllCenters();
        const chartData = [
          {
            id: "PC Performance",
            color: tokens("dark").greenAccent[500],
            data: lineChartDataResponse.data,
          },
        ];
        const chartDataForCenter = [
          {
            id: "Open Hours",
            color: tokens("dark").greenAccent[500],
            data: [],
          },
        ];
        const responseStat = await getStatBoxData();
        setRegStudentsCount(responseStat.data.allStudentCount);
        setTodayStudentsCount(responseStat.data.dailyStudentCount);
        setAllCenters(allCentersListResponse.data);
        setAllPCs(response.data.allPcCount);
        setTodayWorkingPCs(response.data.todayWorkingPCs);
        setCurrentWorkingPCs(response.data.currentWorkingPCs);
        setLineChartData(chartData);
        setOpenLineChartData(chartDataForCenter);
        document.getElementById("province").innerHTML = "Province";
        document.getElementById("district").innerHTML = "District";
        document.getElementById("center").innerHTML = "Center";
      } catch (error) {
        toast.error("Error fetching data");
      }
    }
  };
  const handleChartData = async () => {
    if (!value[0] || !value[1]) {
      toast.error("Please select both start and end dates.");
      return;
    }
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
      const response = await getSelectedCenterPCPerformanceForDateRange(
        selectedOptionCenter,
        `${startDay}-${startMonth}-${startYear}`,
        `${endDay}-${endMonth}-${endYear}`
      );

      const chartData = [
        {
          id: "PC Performance",
          color: tokens("dark").greenAccent[500],
          data: response.data,
        },
      ];
      setLineChartData(chartData);
      toast.success("Generated your record. View On the table");
    } catch (error) {
      console.log(error);
      toast.error("Please refresh");
    }
  };
  const handleReset = async () => {
    const response = await getSelectedCenterPCPerformance(selectedOptionCenter);

    const chartData = [
      {
        id: "PC Performance",
        color: tokens("dark").greenAccent[500],
        data: response.data,
      },
    ];
    setLineChartData(chartData);
    setValue([dayjs(""), dayjs("")]);
  };

  const shouldDisableDate = (date) => {
    if (!value[0]) return false;
    const differenceInDays = date.diff(value[0], "day");
    return differenceInDays < 0 || differenceInDays > 31;
  };

  if (loading) {
    return <div id="cover-spin"></div>;
  }
  return (
    <Box m="0 20px">
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="70px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel id="province">Province</InputLabel>
              <Select
                variant="filled"
                fullWidth
                id="province"
                name="province"
                type="text"
                defaultValue=""
                required
                onChange={(e) => {
                  setSelectedProvince(e.target.value); // Update selected province when changed
                  handleProvinceChange(e); // Handle other form changes
                }}
              >
                {provinces.map((province) => (
                  <MenuItem
                    key={province.provinceId}
                    value={province.provinceId}
                  >
                    {province.provinceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel id="district">District</InputLabel>
              <Select
                variant="filled"
                fullWidth
                id="district"
                name="district"
                type="text"
                defaultValue=""
                required
                onChange={(e) => {
                  setSelectedDistrict(e.target.value); // Update selected province when changed
                  handleDistrictChange(e); // Handle other form changes
                }}
              >
                {districts.map((district) => (
                  <MenuItem
                    key={district.districtId}
                    value={district.districtId}
                  >
                    {district.districtName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel id="center">Center</InputLabel>
              <Select
                variant="filled"
                fullWidth
                id="center"
                name="center"
                type="text"
                defaultValue=""
                required
                onChange={(e) => {
                  handleCenterChange(e); // Handle other form changes
                }}
              >
                {centers.map((center) => (
                  <MenuItem key={center.centerCode} value={center.centerCode}>
                    {center.centerName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <Autocomplete
                id="search"
                options={allCenters}
                getOptionLabel={(option) => option.centerName}
                onChange={(event, value) => handleSelect(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Center By Name"
                    variant="filled"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box id="test" display="none">
        <Box display="flex" sx={{ padding: "10px" }}>
          <Box
            sx={{
              textAlign: "left",
              display: "grid",
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="h5">Registered Students</Typography>
            <Typography variant="h5">Total PCs</Typography>
            <Typography variant="h5">More To Reach 14h</Typography>
            <Typography variant="h5">More To Reach 90% Performance</Typography>
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
          </Box>
          <Box
            sx={{
              textAlign: "left",
              display: "grid",
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="h5">{regStudentCount}</Typography>
            <Typography variant="h5">{allPCCount}</Typography>
            <Typography variant="h5">{startTimeH}h</Typography>
            <Typography variant="h5">{performance} %</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1">Realtime data section</Typography>
      </Box>
      <Box
        display="grid"
        justifyContent="space-between"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt="10px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            name="todayStudent"
            title="Today Students"
            progress={`${(todayStudentCount / regStudentCount) * 100 || 0.0}`}
            value={todayStudentCount}
            fullStudentValue={regStudentCount}
          />
        </Box>
        <Box
          gridColumn="span 4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            name="todayPCs"
            title="Today PCs"
            progress={`${(todayWorkingPCs / allPCCount) * 100 || 0.0}`}
            value={todayWorkingPCs}
            fullStudentValue={allPCCount}
          />
        </Box>
        <Box
          gridColumn="span 4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            name="todayStudent"
            title="Live Working PCs"
            progress={`${(currentWorkingPCs / todayWorkingPCs) * 100 || 0.0}`}
            value={currentWorkingPCs}
            fullStudentValue={todayWorkingPCs}
          />
        </Box>
        <Box
          gridColumn="span 12"
          height="320px"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          id="performance-chart-container"
        >
          <Box
            sx={{
              padding: "10px",
              display: "none",
              justifyContent: "center",
            }}
            id="center-datePicker"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DateRangePicker", "DateRangePicker"]}
                >
                  <DemoItem component="DateRangePicker">
                    <DateRangePicker
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      defaultValue={today}
                      disableFuture
                      shouldDisableDate={shouldDisableDate}
                      minDate={dayjs("2024-01-01")}
                      maxDate={dayjs().subtract(1, "day")}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              <Button
                variant="contained"
                onClick={handleChartData}
                sx={{
                  padding: "10px",
                  height: "52px",
                  ml: "5px",
                  mt: "8px",
                  backgroundColor: "red",
                }}
              >
                Get Data
              </Button>
              <Button
                variant="contained"
                onClick={handleReset}
                sx={{
                  padding: "10px",
                  height: "52px",
                  ml: "5px",
                  mt: "8px",
                  backgroundColor: "red",
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
          <Box height="320px" m="-20px 0 0 0">
            <LineChart
              isDashboard={true}
              data={lineChartData}
              leftAxisName="PC Performance (%)"
              bottomAxisName="Date"
              area={false}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 12"
          height="320px"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          id="performance-chart-container"
          sx={{mt:"25px"}}
        >
          <Box id="openHours" height="320px">
            <LineChart
              isDashboard={true}
              data={openLineChartData}
              leftAxisName="Work Hours (h)"
              bottomAxisName="Date"
              area={false}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PCWorkHours;
