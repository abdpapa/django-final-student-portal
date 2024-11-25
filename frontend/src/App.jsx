
import './App.css';
import {Routes,Route} from 'react-router-dom'
import LoginComponent from './components/Login';
import Home from './home';
import RegisterComponent from './components/Register';
import RegisterTeacher from './components/RegisterTeacher';
import LoginTeacher from './components/LoginTeacher';
import Createquiz from './components/Quiz';
import CourseDetails from './components/CoursDetails';
import GetCourses from './getCourses';
import AddTest from './AddTest';
import ProtectedRoute from './components/protectedRutes';
import Studenthomepage from './StudentHomepage';
function App() {
  return (
    <div className="App">
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/teacherregister" element={<RegisterTeacher />} />
      <Route path="/teacherlogin" element={<LoginTeacher />} />
      <Route  path='/quiz' element={<Createquiz/>}/>
      <Route  path='/getCourses' element={<GetCourses/>}/>
      <Route path='/courses/:cname' element={<CourseDetails/>} />
      <Route path='/addTest' element={<AddTest/>} />
      <Route path='/home' element={<Studenthomepage/>} />

      {/* Protected Routes */}
      {/* <Route
        path="/home"
        element={
          <ProtectedRoute  allowedRoles={['false']}>
            <Home />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/getCourses"
        element={
          <ProtectedRoute allowedRoles={['false']}>
            <GetCourses />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/quiz"
        element={
          <ProtectedRoute allowedRoles={['true']}>
            <CreateQuiz />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
    </div>
  );
}

export default App;
