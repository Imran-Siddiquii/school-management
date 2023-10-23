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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "./teacherSlice";

const TeacherList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teacherList, status, error } = useSelector((state) => state.teachers);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
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
        Teachers
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
                onClick={() => navigate("/teacher/add")}
              >
                {" "}
                Add Teacher
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div>
            <h2 style={{ margin: "1rem" }}>Teacher Lists</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Contact Information</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teacherList.map((teacher, index) => (
                    <TableRow
                      style={{
                        cursor: "pointer"
                      }}
                      key={index}
                      onClick={() =>
                        navigate(`/teacher/details/${teacher._id}`)
                      }
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>{teacher.contact_info}</TableCell>
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

export default TeacherList;
