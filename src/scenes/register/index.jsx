import { useEffect, useState } from "react";
import {
  Backdrop,
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  Select,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";

import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import { getProvinces } from "../../services/areaService";
import { getDistricts } from "../../services/districtService";
import { getCenters } from "../../services/centerService";
import {
  registerStudent,
  verifyStudentEmail,
} from "../../services/studentAttendanceService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../global/Loader";

const initialValues = {
  email: "",
  name: "",
  phone: "",
  guardianPhone: "",
  province: "",
  district: "",
  center: "",
  address: "",
};
const initialValues2 = {
  verificationCode: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format: Enter a valid specific email address"
    )
    .required("*Required field"),
  name: Yup.string().required("Name is required").trim(),
  center: Yup.string().required("Center name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^0\d{9}$/, "Invalid phone number. 0xxxxxxxxx")
    .trim(),
  guardianPhone: Yup.string()
    .required("Guardian phone number is required")
    .matches(/^0\d{9}$/, "Invalid phone number. 0xxxxxxxxx")
    .trim(),
  district: Yup.string().required("District is required"),
  province: Yup.string().required("Province is required"),
  address: Yup.string().required("Address is required").trim(),
});

const validationSchema2 = Yup.object().shape({
  verificationCode: Yup.string().required("Verification code is required"),
});
const defaultTheme = createTheme();
const Register = () => {
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#0000005e",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const [open, setOpen] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [centers, setCenters] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

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
          console.log(error);
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={9} square>
          <Box
            sx={{
              my: 1,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="Company Logo"
                width="100px"
                height="100px"
                src={`../../assets/logo.png`}
                style={{ borderRadius: "50%" }}
              />
            </Box>
            <Typography component="h3" variant="h4">
              Student Registration
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(true);
                try {
                  const response = await registerStudent(values);
                  console.log(response);
                  console.log(response.data.retunValue);
                  setTimeout(() => {
                    if (response.data.o_sql_msg === "success") {
                      setStudentCode(response.data.retunValue);
                      toast.success(
                        "You are successfully registered for DP monitoring system"
                      );  
                      navigate("/");
                      //handleOpen();
                    } else if (
                      response.data.o_sql_msg === "STUDENT ALREADY INSERT"
                    ) {
                      toast.error("This email is already in use");
                    } else if (
                      response.data.o_sql_msg ===
                      "AN EMAIL HAS BEEN SENT. PLEASE check YOUR INBOX!"
                    ) {
                      toast.error(
                        "The verification code has been sent to the email you provided.Kindly check your inbox"
                      );
                      //handleOpen();
                      setStudentCode(response.data.retunValue);
                    }
                  }, 2000);
                } catch (ex) {
                  console.log("Test", ex);
                  toast.error("Error fetching data");
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                isValid,
                handleBlur,
                handleChange,
              }) => (
                <Box noValidate sx={{ mt: 1 }}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      margin="normal"
                      fullWidth
                      variant="filled"
                      id="email"
                      label="Email Address"
                      name="email"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email.toLocaleLowerCase()}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      margin="normal"
                      variant="filled"
                      fullWidth
                      name="name"
                      label="Full Name"
                      type="text"
                      id="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          margin="normal"
                          variant="filled"
                          fullWidth
                          name="phone"
                          label="Phone Number"
                          type="text"
                          id="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          error={!!touched.phone && !!errors.phone}
                          helperText={touched.phone && errors.phone}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          margin="normal"
                          variant="filled"
                          fullWidth
                          name="guardianPhone"
                          label="Guardian Phone Number"
                          type="text"
                          id="guardianPhone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.guardianPhone}
                          error={
                            !!touched.guardianPhone && !!errors.guardianPhone
                          }
                          helperText={
                            touched.guardianPhone && errors.guardianPhone
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={4} my={2}>
                        <FormControl fullWidth>
                          <InputLabel id="province">Province</InputLabel>
                          <Select
                            variant="filled"
                            fullWidth
                            id="province"
                            name="province"
                            type="text"
                            required
                            onChange={(e) => {
                              setSelectedProvince(e.target.value); // Update selected province when changed
                              handleChange(e); // Handle other form changes
                            }}
                            value={values.province}
                            onBlur={handleBlur}
                            error={!!touched.province && !!errors.province}
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
                          {touched.province && errors.province && (
                            <FormHelperText error={true}>
                              {errors.province}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} my={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            District
                          </InputLabel>
                          <Select
                            variant="filled"
                            fullWidth
                            required
                            labelId="demo-simple-select-label"
                            id="district"
                            name="district"
                            value={values.district}
                            error={!!touched.district && !!errors.district}
                            helperText={touched.district && errors.district}
                            onChange={(e) => {
                              setSelectedDistrict(e.target.value); // Update selected province when changed
                              handleChange(e); // Handle other form changes
                            }}
                            onBlur={handleBlur}
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
                          {touched.district && errors.district && (
                            <FormHelperText error={true}>
                              {errors.district}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} my={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Center
                          </InputLabel>
                          <Select
                            label="Guardian Phone Number"
                            variant="filled"
                            fullWidth
                            id="center"
                            name="center"
                            required
                            value={values.center}
                            error={!!touched.center && !!errors.center}
                            helperText={touched.center && errors.center}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {centers.map((center) => (
                              <MenuItem
                                key={center.centerCode}
                                value={center.centerCode}
                              >
                                {center.centerName}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.center && errors.center && (
                            <FormHelperText error={true}>
                              {errors.center}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <TextField
                      margin="normal"
                      variant="filled"
                      fullWidth
                      name="address"
                      label="Home Address"
                      type="address"
                      required
                      id="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && errors.address}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={!isValid}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Register
                    </Button>
                  </form>
                </Box>
              )}
            </Formik>
          </Box>
        </Grid>
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableBackdropClick={true}
        >
          <Box sx={style}>
            <Formik
              initialValues={initialValues2}
              validationSchema={validationSchema2}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                const otp = parseInt(values.verificationCode, 10);
                const obj = {
                  studentCode: studentCode,
                  otp: otp,
                };

                try {
                  const response = await verifyStudentEmail(obj);
                  console.log("asd", response);
                  if (response.data.o_sql_msg === "success") {
                    toast.success(
                      "You are successfully registered for DP monitoring system"
                    );

                    navigate("/");
                  } else {
                    toast.error("Registration was unsuccessful ");
                  }
                } catch (error) {
                  toast.error(error.message);
                  console.log(error);
                }
              }}
            >
              {({
                values,
                handleSubmit,
                isValid,
                errors,
                touched,
                handleBlur,
                handleChange,
                resetForm,
              }) => (
                <Box noValidate sx={{ mt: 1 }}>
                  <form onSubmit={handleSubmit}>
                    <Typography
                      htmlFor="email"
                      sx={{
                        color: "white",
                        fontSize: "20px",
                        wordWrap: "break-word",
                      }}
                    >
                      Enter Verification Code
                    </Typography>
                    (The verification code has been sent to the email you
                    provided. Kindly check your inbox and enter the code here.)
                    <Typography></Typography>
                    <TextField
                      margin="normal"
                      fullWidth
                      variant="filled"
                      sx={{ backgroundColor: "white" }}
                      id="verificationCode"
                      label="Your verification code"
                      name="verificationCode"
                      autoComplete="none"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.verificationCode}
                      error={
                        !!touched.verificationCode && !!errors.verificationCode
                      }
                      helperText={
                        touched.verificationCode && errors.verificationCode
                      }
                    />
                    <Box
                      display="flex"
                      justifyContent="center"
                      marginTop="10px"
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        style={{
                          backgroundColor: "red",
                          fontSize: "15px",
                          margin: "10px",
                        }}
                      >
                        Verify
                      </Button>
                    </Box>
                  </form>
                </Box>
              )}
            </Formik>
          </Box>
        </Modal> */}
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
