import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";


import * as Yup from "yup";

import { toast } from "react-toastify";
import { userLogin } from "../../services/abc/loginService";

const initialValues = { username: "", password: "" };

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("*Required field"),
  password: Yup.string().required("Password is required").trim(),
});
const defaultTheme = createTheme();

export default function SignInSide() {
  const handleFormSubmit = async (values) => {
    console.log(values)
    try {
      const response = await userLogin(values.username, values.password);
      console.log(response.data.patient.id);
      localStorage.setItem("Role", response.data.userType);
      if (response.data.userType === "Patient") {
        window.location.href = "dashboard/executive";
        localStorage.setItem("patientId", response.data.patient.id);
      } else if (response.data.userType === "Staff") {
        localStorage.setItem("Status", response.data.attendanceCode);
        localStorage.setItem("User", response.data.userCode);
        localStorage.setItem("UserName", response.data.userName);
        console.log(response);
        window.location.href = "staff-dashboard/center-manager";
      } else if (response.data.userType === "DPS") {
        window.location.href = "dp-staff-dashboard/staff";
      } else if (response.data.userType === "hmw") {
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
            <Typography component="h1" variant="h5">
              Login
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
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
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
