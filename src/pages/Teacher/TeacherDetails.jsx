import { IconButton, Paper, Typography, Grid } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteTeachers } from "./teacherSlice";
import { useDispatch, useSelector } from "react-redux";
const StudentDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { teacherList } = useSelector((state) => state.teachers);
  const teacherDetail = teacherList.find((ele) => ele._id == id);

  const handleRemoveTeacher = (id) => {
    dispatch(deleteTeachers(id));
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
      <Typography>{teacherDetail && "Teacher Details"}</Typography>
      {teacherDetail ? (
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
                  Name : {teacherDetail.name}
                </Typography>
                <Typography variant="body1">
                  Subject : {teacherDetail.subject}
                </Typography>
                <Typography variant="body2">
                  Contact_Info : {teacherDetail.contact_info}
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <Link to="/teacher/add" state={teacherDetail}>
                    <Edit style={{ color: "#0283bd" }} />
                  </Link>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveTeacher(teacherDetail._id)}
                >
                  <Delete style={{ color: "#0283bd" }} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </Grid>
      ) : (
        "Teacher not found"
      )}
    </Grid>
  );
};

export default StudentDetails;
