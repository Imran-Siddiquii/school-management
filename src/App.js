// if server is not running , please run manually this is my replt link
//https://replit.com/@Imransiddiqui2/fitness-api#index.js

import Sidebar from "./components/Sidebar";
import StudentForm from "./pages/Students/StudentForm";
import Students from "./pages/Students";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import StudentDetails from "./pages/Students/StudentDetails";
import Teacher from "./pages/Teacher";
import TeacherForm from "./pages/Teacher/TeacherForm";
import TeacherDetails from "./pages/Teacher/TeacherDetails";
import Classes from "./pages/Classes";
import School from "./pages/School";

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="page-container">
        <Routes>
          <Route exact path="/" element={<Students />} />
          <Route exact path="/student/add" element={<StudentForm />} />
          <Route
            exact
            path="/student/details/:id"
            element={<StudentDetails />}
          />
          <Route exact path="/teachers" element={<Teacher />} />
          <Route exact path="/teacher/add" element={<TeacherForm />} />
          <Route
            exact
            path="/teacher/details/:id"
            element={<TeacherDetails />}
          />
          <Route exact path="/classes" element={<Classes />} />
          <Route exact path="/school" element={<School />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
