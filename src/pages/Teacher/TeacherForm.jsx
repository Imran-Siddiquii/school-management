import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Grid
} from "@mui/material";
import { useState } from "react";
import { addTeachers, editTeachers } from "./teacherSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const StudentForm = () => {
  const location = useLocation();
  const { state } = location;
  const teacher = state ? state : null;
  const [name, setName] = useState(teacher ? teacher.name : "");
  const [subject, setSubject] = useState(teacher ? teacher.subject : "");
  const [contact_info, setContact_Info] = useState(
    teacher ? teacher.contact_info : ""
  );
  const [formError, setFormError] = useState(false);
  const dispatch = useDispatch();

  const handleAddTeacher = () => {
    if (
      name.trim() === "" ||
      subject.toString().trim() === "" ||
      contact_info.toString().trim() === ""
    ) {
      return setFormError(true);
    }
    const teacherData = {
      name,
      subject,
      contact_info
    };
    if (teacher) {
      dispatch(editTeachers({ _id: teacher._id, ...teacherData }));
    } else {
      dispatch(addTeachers(teacherData));
    }
    setFormError(false);
    setName("");
    setSubject("");
    setContact_Info("");
  };
  return (
    <>
      <Grid
        className="exercise-container"
        sx={{
          border: "1px solid #0283bd",
          padding: "1rem",
          margin: "1rem",
          borderRadius: "5px"
        }}
      >
        <Paper elevation={3} className="exercise-form">
          <Typography variant="h5" gutterBottom color="#0283bd">
            Add Student
          </Typography>
          <TextField
            label="Name"
            fullWidth
            className="text-field-form"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Subject"
            fullWidth
            className="text-field-form"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            label="Contact_Info"
            fullWidth
            type="number"
            className="text-field-form"
            value={contact_info}
            onChange={(e) => setContact_Info(e.target.value)}
          />
          {formError ? (
            <p className="error-message">Please fill all this fields</p>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTeacher}
            style={{
              marginTop: "16px",
              backgroundColor: "#0283bd",
              color: "white"
            }}
          >
            {teacher ? "Update Teacher" : "Add Teacher"}
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default StudentForm;
