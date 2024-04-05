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
import { getProvinces } from "../../../services/areaService";
import { getDistricts } from "../../../services/districtService";
import { toast } from "react-toastify";
import { registerCenter } from "../../../services/staff-services/centerService";
const AddCenter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const initialValues = {
    centerCode: "",
    name: "",
    province: "",
    district: "",
    address: "",
    pcQty: "",
  };
  const validationSchema = Yup.object().shape({
    centerCode: Yup.string()
      .required("Center code is required")
      .matches(/^\d{3}$/, "Please enter a valid three-digit center code")
      .trim(),
    name: Yup.string().required("Name is required").trim(),
    district: Yup.string().required("District is required"),
    province: Yup.string().required("Province is required"),
    address: Yup.string().required("Address is required").trim(),
    pcQty: Yup.string()
      .required("PC Count is required")
      .matches(
        /^([1-9]\d{0,2}|999)$/,
        "Invalid input. Please ensure your entry consists only of numeric digits."
      )
      .trim(),
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

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
          const response = await getDistricts(selectedProvince);

          setDistricts(response.data);
        } catch (error) {
          toast.error("Error fetching data");
        }
      }
    };

    fetchDistrictData();
  }, [selectedProvince]);
  return (
    <Box m="0 20px">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="table-column"
          alignItems="center"
          justifyContent="center"
          padding="20px"
        >
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            ADD NEW CENTER
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                const response = await registerCenter(values);
                console.log("sadasd",response);
                if (
                  response.data.o_sql_msg === "Insert the center successfully."
                ) {
                  toast.success("Successfully Added New Center");
                } else {
                  toast.error("Something went wrong while adding new center");
                }
              } catch (error) {
                toast.error("Adding new center was unsuccessful");
              }
              console.log(values);
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
                    fullWidth
                    variant="filled"
                    id="centerCode" 
                    label="Center Code"
                    name="centerCode"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.centerCode}
                    error={!!touched.centerCode && !!errors.centerCode}
                    helperText={touched.centerCode && errors.centerCode}
                  />
                  <TextField
                    margin="normal"
                    variant="filled"
                    fullWidth
                    name="name"
                    label="Center Name"
                    type="text"
                    id="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        variant="filled"
                        fullWidth
                        name="pcQty"
                        label="PC Count"
                        type="pcQty"
                        id="pcQty"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pcQty}
                        error={!!touched.pcQty && !!errors.pcQty}
                        helperText={touched.pcQty && errors.pcQty}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                            //setSelectedDistrict(e.target.value); // Update selected province when changed
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
                  </Grid>
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

export default AddCenter;
