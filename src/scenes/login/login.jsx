import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { login } from "../../services/authService";
import { toast } from "react-toastify";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const initialValues = { email: "", password: "" };

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid one")
    .trim()
    .required("*Required field"),
  password: Yup.string().required("Password is required").trim(),
});
const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    try {
      const response = await login(values.email, values.password);
      localStorage.setItem("Role", response.data.userType);
      console.log(response);
      if (response.data.userType === "ADM") {
        window.location.href = "dashboard/executive";
      }
      else if(response.data.userType === "CIC")
      {
        localStorage.setItem("CenterCode", response.data.centerCode);
        localStorage.setItem("Status",response.data.attendanceCode);
        localStorage.setItem("User",response.data.userCode);
        localStorage.setItem("UserName",response.data.userName);
        console.log(response)
        window.location.href = "staff-dashboard/center-manager";
      }
      else if(response.data.userType === "DPS")
      {
        window.location.href = "dp-staff-dashboard/staff";
      }
      else if(response.data.userType === "hmw")
      {
        window.location.href = "super-admin/admin";
      }
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
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
                  style={{borderRadius: "50%" }}
                />
              </Box>
            
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
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
                      autoComplete="email"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      margin="normal"
                      variant="filled"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                  </form>
                </Box>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
