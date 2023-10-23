import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import "../Students/index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../Students/studentSlice";

const School = () => {
  const dispatch = useDispatch();
  const { studentList, status, error } = useSelector((state) => state.students);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  const total = studentList.reduce(
    (acc, obj) => {
      if (obj.marks > acc.highestMarks) {
        acc.highestMarks = obj.marks;
        acc.highestMarksObject = obj;
      }
      acc.totalMarks += obj.marks;
      acc.totalAttendance += obj.attendance;
      return acc;
    },
    {
      totalMarks: 0,
      highestMarks: -1,
      highestMarksObject: null,
      totalAttendance: 0
    }
  );
  const {
    totalMarks,
    totalAttendance,
    highestMarks,
    highestMarksObject
  } = total;
  const averageMarks = totalMarks / studentList.length;

  const averageAttendance = totalAttendance / studentList.length;

  return (
    <div className="exercise-container" sx={{ border: "1px solid gray" }}>
      <Typography
        variant="h4"
        mt={6}
        textAlign="center"
        color="#0283bd"
        gutterBottom
      >
        School
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
        <Grid item xs={12} sm={12}>
          <div>
            <h2 style={{ margin: "1rem" }}>School-wide statistics</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Total Students</TableCell>
                    <TableCell>Average Attendance</TableCell>
                    <TableCell>Average Marks</TableCell>
                    <TableCell>Top performing student</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{studentList && studentList.length}</TableCell>
                    <TableCell>{averageAttendance?.toFixed(2)}%</TableCell>
                    <TableCell>{averageMarks}</TableCell>
                    <TableCell>{highestMarksObject?.name}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default School;
