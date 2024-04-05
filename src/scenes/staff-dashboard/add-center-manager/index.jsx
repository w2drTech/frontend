import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { registerCenterManager } from "../../../services/staff-services/centerService";
import { toast } from "react-toastify";
const AddCenterManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const initialValues = {
    name: "",
    centerCode: "",
    phone: "",
    address: "",
    email: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    centerCode: Yup.string()
      .required("Center code is required")
      .matches(/^\d{3}$/, "Please enter a valid three-digit center code")
      ,
    email: Yup.string().required("Email is required").email(),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone Number is required"),
  });

  return (
    <Box m="0 20px">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb="10px"
        ></Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="table-column"
          alignItems="center"
          justifyContent="center"
          padding="20px"
          mb="10px"
        >
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            ADD NEW CENTER MANAGER
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                const response = await registerCenterManager(values);
                console.log("sadsadasd", response);
                if (response.data.o_sql_msg === "success") {
                  toast.success("Successfully Added New Center Manager");
                }
                else
                {
                  toast.error(
                    "Something went wrong while adding new center manager"
                  );
                }
              } catch (error) {
                console.log(error);
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
              resetForm,
            }) => (
              <Box noValidate>
                <form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    variant="filled"
                    fullWidth
                    name="name"
                    label="Name"
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email.trim()}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    variant="filled"
                    id="centerCode"
                    label="Center Code"
                    name="centerCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.centerCode.trim()}
                    error={!!touched.centerCode && !!errors.centerCode}
                    helperText={touched.centerCode && errors.centerCode}
                  />
                  <TextField
                    margin="normal"
                    variant="filled"
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    type="phone"
                    id="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone.trim()}
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                  />
                  <TextField
                    margin="normal"
                    variant="filled"
                    fullWidth
                    name="address"
                    label="Address"
                    type="address"
                    id="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                  />

                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!isValid}
                        sx={{
                          mt: 3,
                          mb: 2,
                          backgroundColor: colors.blueAccent[800],
                        }}
                      >
                        Register
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        type="submit"
                        fullWidth
                        onClick={resetForm}
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          backgroundColor: colors.primary[300],
                        }}
                      >
                        Reset
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCenterManager;
