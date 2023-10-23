import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentSlice";

const SdudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentList, status, error } = useSelector((state) => state.students);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  return (
    <div className="exercise-container" sx={{ border: "1px solid gray" }}>
      <Typography
        variant="h4"
        mt={6}
        textAlign="center"
        color="#0283bd"
        gutterBottom
      >
        Students
      </Typography>
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
        <Grid item xs={12} sm={8}>
          <Grid item container>
            <Grid sm={12} justifyContent="end">
              <Button
                variant="contained"
                onClick={() => navigate("/student/add")}
              >
                {" "}
                Add Student
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div>
            <h2 style={{ margin: "1rem" }}>Student Lists</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentList.map((student, index) => (
                    <TableRow
                      style={{
                        cursor: "pointer"
                      }}
                      key={index}
                      onClick={() =>
                        navigate(`/student/details/${student._id}`)
                      }
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.age}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SdudentList;
