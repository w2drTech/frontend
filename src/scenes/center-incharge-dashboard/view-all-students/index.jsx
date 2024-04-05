import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import {
  getCenterAllStudents,
  updateRegisteredStudent,
} from "../../../services/center-manager-services/getStudentData";
import Loader from "../../global/Loader";

const ViewAllStudents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(true);
  const initialValues = {
    email: "",
    studentName: "",
    phoneNumber: "",
    parentPhoneNumber: "",
    address: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format: Enter a valid specific email address"
      )
      .trim(),
    phoneNumber: Yup.string()
      .matches(/^0\d{9}$/, "Invalid phone number. 0xxxxxxxxx")
      .trim(),
    parentPhoneNumber: Yup.string()
      .matches(/^0\d{9}$/, "Invalid phone number. 0xxxxxxxxx")
      .trim(),
  });

  useEffect(() => {
    const centerId = localStorage.getItem("CenterCode");
    const fetchAllStudentData = async () => {
      try {
        const response = await getCenterAllStudents(centerId);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchAllStudentData();
  }, []);
  const handleUpdate = (id) => {
    const selectedData = data.find((element) => element.studentCode === id);
    setSelectedData(selectedData);
    handleOpen();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  const columns = [
    {
      field: "studentName",
      headerName: "Name",
      flex: 4,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase" }}>{params.value}</Box>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 2,
    },
    {
      field: "parentPhoneNumber",
      headerName: "Guardian Phone Number",
      flex: 2,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 4,
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Box style={{ textTransform: "uppercase" }}>{params.value}</Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => handleUpdate(params.id)}
            variant="contained"
            style={{ backgroundColor: "#4cceac", color: "black" }}
          >
            Update
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <Box m="0 20px">
      {isLoading ? (
        // Show loader while data is being fetched
        <Loader />
      ) : (
        <Box
          display="grid"
          height="78vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              fontSize: "15px",
            },
            "& .name-column--cell": {
              color: colors.primary[100],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              border: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.redAccent[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={data}
            getRowId={(row) => row.studentCode}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              Object.keys(values).forEach((fieldName) => {
                if (
                  values[fieldName] === "" &&
                  selectedData[fieldName] !== undefined
                ) {
                  values[fieldName] = selectedData[fieldName];
                }
              });
              try {
                const studentCode = selectedData.studentCode;
                const response = await updateRegisteredStudent(
                  studentCode,
                  values
                );
                if (response.data.sql_msg === "success") {
                  toast.success("Student updated successfully!");
                } else {
                  toast.error(
                    "An error occurred while updating the student. Please try again."
                  );
                }
              } catch (error) {
                toast.error("Error submitting form:", error);
              } finally {
                handleClose(); // Close the modal after submission
                setSubmitting(false);
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
                  <InputLabel htmlFor="email">Email address</InputLabel>
                  <TextField
                    margin="normal"
                    fullWidth
                    variant="filled"
                    id="email"
                    label={selectedData.email}
                    name="email"
                    autoComplete="none"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email.toLocaleLowerCase()}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                  <InputLabel margin="0px" htmlFor="studentName">
                    Name
                  </InputLabel>
                  <TextField
                    margin="normal"
                    variant="filled"
                    fullWidth
                    name="studentName"
                    label={selectedData.studentName}
                    type="text"
                    id="studentName"
                    autoComplete="none"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={!!touched.studentName && !!errors.studentName}
                    helperText={touched.studentName && errors.studentName}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <InputLabel htmlFor="phoneNumber">
                        Phone Number
                      </InputLabel>
                      <TextField
                        margin="normal"
                        variant="filled"
                        fullWidth
                        name="phoneNumber"
                        label={selectedData.phoneNumber}
                        type="text"
                        id="phoneNumber"
                        autoComplete="none"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        error={!!touched.phoneNumber && !!errors.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel htmlFor="parentPhoneNumber">
                        Guardian Phone Number
                      </InputLabel>
                      <TextField
                        margin="normal"
                        variant="filled"
                        fullWidth
                        name="parentPhoneNumber"
                        label={selectedData.parentPhoneNumber}
                        type="text"
                        id="parentPhoneNumber"
                        autoComplete="none"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.parentPhoneNumber}
                        error={
                          !!touched.parentPhoneNumber &&
                          !!errors.parentPhoneNumber
                        }
                        helperText={
                          touched.parentPhoneNumber && errors.parentPhoneNumber
                        }
                      />
                    </Grid>
                  </Grid>
                  <InputLabel htmlFor="address">Address</InputLabel>
                  <TextField
                    margin="normal"
                    variant="filled"
                    fullWidth
                    name="address"
                    label={selectedData.address}
                    type="address"
                    id="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                  />
                  <Box display="flex" justifyContent="center" marginTop="10px">
                    <Button
                      variant="contained"
                      type="submit"
                      style={{
                        backgroundColor: "red",
                        fontSize: "15px",
                        margin: "10px",
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{
                        backgroundColor: "white",
                        fontSize: "15px",
                        margin: "10px",
                        color: "red",
                      }}
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  </Box>
                </form>
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewAllStudents;
/**/
