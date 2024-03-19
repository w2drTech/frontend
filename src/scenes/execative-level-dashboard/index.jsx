import {
  Box,
  Typography,
  useTheme,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "../../../src/style.css";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  addAppointment,
  getAppointments,
} from "../../services/abc/appointmentService";
const PatientDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [disabledDates, setDisabledDates] = useState();
  const [seletedDate, setSelectedDate] = useState();
  const [time, setTime] = useState();
  const [testType, setTestType] = useState();
  const initialValues = {
    date: "",
  };
  useEffect(async () => {
    const response = await getAppointments();
    const dates = response.data.map((appointment) => appointment.date);
    setDisabledDates(dates);
  }, []);

  const validationSchema = Yup.object().shape({});

  return (
    <Box m="0 20px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const datePicker = document.getElementById("date");
            const selectedDate = datePicker.value;
            setSelectedDate(selectedDate);
            if (disabledDates.includes(selectedDate)) {
              toast.error("This date is already booked!!");
              document.getElementById("btnSubmit").disabled = true;
              datePicker.value = "";
            } else {
              const obj = {
                selectedDate: selectedDate,
                time: time,
                testType: testType,
              };
              const patientId = localStorage.getItem("patientId");
              const response = await addAppointment(obj, patientId);
              toast.success("successfully added a appointment");
            }
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
          <Box
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box sx={{ justifyContent: "center", background: "white" }}>
              <form onSubmit={handleSubmit}>
                <label for="date" style={{ color: "black", margin: "10px" }}>
                  Choose a date:
                </label>
                <input type="date" id="date" name="date" required />
                <label for="time" style={{ color: "black", margin: "10px" }}>
                  Choose a time:
                </label>
                <select
                  name="time"
                  id="time"
                  onChange={(e) => {
                    setTime(e.target.value); // Update selected province when changed
                  }}
                >
                  <option value="08:00">08:00</option>
                  <option value="10:00">10:00</option>
                  <option value="12:00">12:00</option>
                  <option value="14:00">14:00</option>
                </select>
                <label for="time" style={{ color: "black", margin: "10px" }}>
                  Test Type
                </label>
                <select
                  name="time"
                  id="time"
                  onChange={(e) => {
                    setTestType(e.target.value); // Update selected province when changed
                  }}
                >
                  <option value="Blood Test">Blood Test</option>
                  <option value="X-Ray">X-Ray</option>
                  <option value="Ultrasound Scan">Ultrasound Scan</option>
                  <option value="MRI Scan">MRI Scan</option>
                  <option value="Electrocardiogram (ECG)">
                    Electrocardiogram (ECG)
                  </option>
                  <option value="Colonoscopy">Colonoscopy</option>
                  <option value="Endoscopy">Endoscopy</option>
                </select>
                <Button
                  type="submit"
                  fullWidth
                  id="btnSubmit"
                  variant="contained"
                  disabled={!isValid}
                  sx={{ m: "10px", width: "100px" }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default PatientDashboard;
