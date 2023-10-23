import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStandard,
  fetchStudents,
  filteredBy,
  sortedBy
} from "../Students/studentSlice";

const Classes = () => {
  const dispatch = useDispatch();
  const {
    studentList,
    loading,
    standard,
    filterValue,
    sortValue
  } = useSelector((state) => state.students);
  const uniqueStandard = [
    "All",
    ...new Set(studentList.map((list) => list.standard))
  ];

  useEffect(() => {
    if (standard == "All") {
      dispatch(fetchStudents());
    }
  }, [dispatch]);
  const classList = studentList.filter((student) => {
    if (standard === "All") return true;
    return student.standard === standard;
  });
  const filteredStudents = classList.filter((student) => {
    if (filterValue === "All") return true;
    return student.gender.toLowerCase() === filterValue;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortValue === "name") return a.name.localeCompare(b.name);
    if (sortValue === "age") return a.age - b.age;
    if (sortValue === "marks") return b.marks - a.marks;
    if (sortValue === "attendance") return b.attendance - a.attendance;
    return 0;
  });

  const handleStandard = (e) => {
    dispatch(fetchStandard(e.target.value));
  };
  const sortBy = (e) => {
    dispatch(sortedBy(e.target.value));
  };
  const filterByGender = (e) => {
    dispatch(filteredBy(e.target.value));
  };

  return (
    <div className="exercise-container" sx={{ border: "1px solid gray" }}>
      <Typography
        variant="h4"
        mt={6}
        textAlign="center"
        color="#0283bd"
        gutterBottom
      >
        Classes
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
          {!loading ? (
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth className="text-field-exercise">
                  <InputLabel sx={{ background: "white", padding: "0 5px" }}>
                    Select Class
                  </InputLabel>
                  <Select value={standard} onChange={handleStandard}>
                    {uniqueStandard.map((list) => (
                      <MenuItem key={list} value={list}>
                        {list}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth className="text-field-exercise">
                  <InputLabel sx={{ background: "white", padding: "0 5px" }}>
                    Sort By
                  </InputLabel>
                  <Select value={sortValue} onChange={sortBy}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="age">Age</MenuItem>
                    <MenuItem value="attendance">Attendance</MenuItem>
                    <MenuItem value="marks">Marks</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth className="text-field-exercise">
                  <InputLabel sx={{ background: "white", padding: "0 5px" }}>
                    Filter Gender
                  </InputLabel>
                  <Select value={filterValue} onChange={filterByGender}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={12}>
            <div>
              <h2 style={{ margin: "1rem" }}>Student Lists</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Serial Number</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Attendance</TableCell>
                      <TableCell>Marks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedStudents.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.standard}</TableCell>
                        <TableCell>{student.age}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.attendance}</TableCell>
                        <TableCell>{student.marks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Classes;
