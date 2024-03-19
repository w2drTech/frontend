import { useEffect, useState } from "react";
import {
  Backdrop,
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  Select,
  TextareaAutosize,
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

import * as Yup from "yup";

import { toast } from "react-toastify";

import { getPatients, patientRegister, patientUserRegister } from "../../services/abc/registerService";

const initialValues = {
  email: "",
  name: "",
  phone: "",
  username: "",
  password: "",
  medicalHistory: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format: Enter a valid specific email address"
    )
    .required("*Required field"),
  name: Yup.string().required("Name is required").trim(),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^0\d{9}$/, "Invalid phone number. 0xxxxxxxxx")
    .trim(),

  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const defaultTheme = createTheme();
const Register = () => {
  useEffect(() => {}, []);

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
            <Typography component="h3" variant="h4">
              Registration
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                //console.log(values);
                setSubmitting(true);
                try {
                  const response = await patientRegister(values);
                  console.log(Response)
                  const regResponse = await patientUserRegister(values,response.data.id)
                  console.log(regResponse)
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
                      fullWidth
                      variant="filled"
                      id="username"
                      label="Username"
                      name="username"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username.toLocaleLowerCase()}
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      variant="filled"
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password.toLocaleLowerCase()}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
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
                    <InputLabel id="medicalHistory">Medical History</InputLabel>
                    <TextareaAutosize
                      variant="filled"
                      fullWidth
                      name="medicalHistory"
                      label="Home Address"
                      type="text"
                      required
                      id="medicalHistory"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.medicalHistory}
                      error={
                        !!touched.medicalHistory && !!errors.medicalHistory
                      }
                      helperText={
                        touched.medicalHistory && errors.medicalHistory
                      }
                      style={{ width: '100%', height: '150px' }}
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
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
