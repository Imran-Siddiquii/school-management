import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://fitness-api.imransiddiqui2.repl.co/api/v1/students"
    );
    return response.data;
  }
);

export const addStudents = createAsyncThunk(
  "students/addStudents",
  async (student) => {
    const response = await axios.post(
      "https://fitness-api.imransiddiqui2.repl.co/api/v1/students",
      student
    );
    return response.data;
  }
);
export const deleteStudents = createAsyncThunk(
  "students/deleteStudents",
  async (studentId) => {
    const response = await axios.delete(
      `https://fitness-api.imransiddiqui2.repl.co/api/v1/students/${studentId}`
    );
    response.data = studentId;
    return response.data;
  }
);
export const editStudents = createAsyncThunk(
  "students/editStudents",
  async (student) => {
    const response = await axios.post(
      "https://fitness-api.imransiddiqui2.repl.co/api/v1/students/update-student",
      student
    );
    return response.data;
  }
);
const initialState = {
  studentList: [],
  standard: "All",
  filterValue: "All",
  sortValue: "All",
  status: "idle",
  error: false
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    fetchStandard: (state, action) => {
      state.standard = action.payload;
    },
    filteredBy: (state, action) => {
      state.filterValue = action.payload;
    },
    sortedBy: (state, action) => {
      state.sortValue = action.payload;
    }
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = "success";
      state.studentList = action.payload.data;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addStudents.pending]: (state) => {
      state.status = "loading";
    },
    [addStudents.fulfilled]: (state, action) => {
      state.status = "success";
      state.studentList = [...state.studentList, action.payload.data];
    },
    [addStudents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editStudents.pending]: (state) => {
      state.status = "loading";
    },
    [editStudents.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload.data;
      const index = state.studentList.findIndex(
        (list) => list._id === updatedStudent._id
      );
      if (index !== -1) {
        state.studentList[index] = updatedStudent;
      }
    },
    [editStudents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteStudents.pending]: (state) => {
      state.status = "loading";
    },
    [deleteStudents.fulfilled]: (state, action) => {
      state.status = "success";
      state.studentList = state.studentList.filter(
        (student) => student._id !== action.payload
      );
    },
    [deleteStudents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});
export const { fetchStandard, sortedBy, filteredBy } = studentSlice.actions;
export default studentSlice.reducer;
