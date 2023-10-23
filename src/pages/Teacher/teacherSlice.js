import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "students/fetchTeachers",
  async () => {
    const response = await axios.get(
      "https://fitness-api.imransiddiqui2.repl.co/api/v1/teachers"
    );
    return response.data;
  }
);

export const addTeachers = createAsyncThunk(
  "students/addTeachers",
  async (student) => {
    const response = await axios.post(
      "https://fitness-api.imransiddiqui2.repl.co/api/v1/teachers",
      student
    );
    return response.data;
  }
);
export const deleteTeachers = createAsyncThunk(
  "students/deleteTeachers",
  async (teacherId) => {
    const response = await axios.delete(
      `https://fitness-api.imransiddiqui2.repl.co/api/v1/teachers/${teacherId}`
    );
    response.data = teacherId;
    return response.data;
  }
);
export const editTeachers = createAsyncThunk(
  "students/editTeachers",
  async (student) => {
    const response = await axios.post(
      "https://fitness-api.imransiddiqui2.repl.co/api/v1/teachers/update-teacher",
      student
    );
    return response.data;
  }
);
const initialState = {
  teacherList: [],
  status: "idle",
  error: false
};

const teacherslice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      state.status = "success";
      state.teacherList = action.payload.data;
    },
    [fetchTeachers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [addTeachers.fulfilled]: (state, action) => {
      state.status = "success";
      state.teacherList = [...state.teacherList, action.payload.data];
    },
    [addTeachers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [editTeachers.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload.data;
      const index = state.teacherList.findIndex(
        (list) => list._id === updatedStudent._id
      );
      if (index !== -1) {
        state.teacherList[index] = updatedStudent;
      }
    },
    [editTeachers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [deleteTeachers.fulfilled]: (state, action) => {
      state.status = "success";
      state.teacherList = state.teacherList.filter(
        (teacher) => teacher._id !== action.payload
      );
    },
    [deleteTeachers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export default teacherslice.reducer;
