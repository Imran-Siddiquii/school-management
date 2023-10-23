import { IconButton, Paper, Typography, Grid } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteStudents } from "./studentSlice";
import { useDispatch, useSelector } from "react-redux";
const StudentDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { studentList } = useSelector((state) => state.students);
  const studentDetail = studentList.find((ele) => ele._id == id);

  const handleRemoveStudent = (id) => {
    dispatch(deleteStudents(id));
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        border: "1px solid #0283bd",
        padding: "1rem",
        margin: "1rem",
        borderRadius: "5px"
      }}
    >
      {studentDetail && <Typography>Student Details</Typography>}
      {studentDetail ? (
        <Grid item xs={12} sm={12}>
          <Paper elevation={3} className="exercise-list-item">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px"
              }}
            >
              <div>
                <Typography variant="h6" color="#0283bd">
                  Name : {studentDetail.name}
                </Typography>
                <Typography variant="body1">
                  Age : {studentDetail.age}
                </Typography>
                <Typography variant="body2">
                  Grade : {studentDetail.grade}
                </Typography>
                <Typography variant="body2">
                  Gender : {studentDetail.gender}
                </Typography>
                <Typography variant="body2">
                  Attendance : {studentDetail.attendance}
                </Typography>
                <Typography variant="body2">
                  Marks : {studentDetail.marks}
                </Typography>
                <Typography variant="body2">
                  Class : {studentDetail.standard}
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <Link to="/student/add" state={studentDetail}>
                    <Edit style={{ color: "#0283bd" }} />
                  </Link>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveStudent(studentDetail._id)}
                >
                  <Delete style={{ color: "#0283bd" }} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </Grid>
      ) : (
        <Typography>Student not found</Typography>
      )}
    </Grid>
  );
};

export default StudentDetails;
