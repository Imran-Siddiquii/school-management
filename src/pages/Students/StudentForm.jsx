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
import { addStudents, editStudents } from "./studentSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const StudentForm = () => {
  const location = useLocation();
  const { state } = location;
  const student = state ? state : null;
  const [name, setName] = useState(student ? student.name : "");
  const [age, setAge] = useState(student ? student.age : "");
  const [gender, setGender] = useState(student ? student.gender : "");
  const [grade, setGrade] = useState(student ? student.grade : "");
  const [attendance, setAttendance] = useState(
    student ? student.attendance : ""
  );
  const [standard, setStandard] = useState(student ? student.standard : "");
  const [marks, setMarks] = useState(student ? student.marks : "");
  const [formError, setFormError] = useState(false);
  const dispatch = useDispatch();

  const handleAddStudent = () => {
    if (
      name.trim() === "" ||
      age.toString().trim() === "" ||
      gender.trim() === "" ||
      grade.trim() === "" ||
      attendance.toString().trim() === "" ||
      standard.trim() === "" ||
      marks.toString().trim() === ""
    ) {
      return setFormError(true);
    }
    const studentData = {
      name,
      age,
      gender,
      grade,
      attendance,
      standard,
      marks
    };
    if (student) {
      dispatch(editStudents({ _id: student._id, ...studentData }));
    } else {
      dispatch(addStudents(studentData));
    }
    setFormError(false);
    setName("");
    setAge("");
    setAttendance("");
    setGrade("");
    setGender("");
    setMarks("");
    setStandard("");
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
            label="Age"
            type="number"
            fullWidth
            className="text-field-form"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            label="Grade"
            // type="String"
            fullWidth
            className="text-field-form"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <FormControl fullWidth className="text-field-form">
            <InputLabel sx={{ background: "white", padding: "0 5px" }}>
              Gender
            </InputLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Attendance"
            type="number"
            fullWidth
            className="text-field-form"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          />
          <TextField
            label="Marks"
            type="number"
            fullWidth
            className="text-field-form"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
          <TextField
            label="Class"
            // type="String"
            fullWidth
            className="text-field-form"
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
          />
          {formError ? (
            <p className="error-message">Please fill all this fields</p>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddStudent}
            style={{
              marginTop: "16px",
              backgroundColor: "#0283bd",
              color: "white"
            }}
          >
            {student ? "Update Student" : "Add Student"}
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default StudentForm;
