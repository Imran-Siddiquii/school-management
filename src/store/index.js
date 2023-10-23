import { configureStore } from "@reduxjs/toolkit";

import studentSlice from "../pages/Students/studentSlice";
import teachersSlice from "../pages/Teacher/teacherSlice";

const store = configureStore({
  reducer: {
    students: studentSlice,
    teachers: teachersSlice
  }
});

export default store;
