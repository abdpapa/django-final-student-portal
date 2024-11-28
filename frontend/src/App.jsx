
import './App.css';
import {Routes,Route} from 'react-router-dom'
import LoginComponent from './components/Login';
import Home from './home';
import RegisterComponent from './components/Register';
import RegisterTeacher from './components/RegisterTeacher';
import LoginTeacher from './components/LoginTeacher';
import Createquiz from './components/Quiz';
import CourseDetails from './components/CoursDetails';
import AddTest from './AddTest';
import ProtectedRoute from './components/protectedRutes';
import Studenthomepage from './StudentHomepage';
import TeacherHomePage from './teacherHomePage';


//ADD START SCREEN
function App() {
  return (
    <div className="App">
    <Routes>
      {/* Public Routes */}
      {/* <Route path="/login" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/teacherregister" element={<RegisterTeacher />} />
      <Route path="/teacherlogin" element={<LoginTeacher />} />
      <Route  path='/quiz' element={<Createquiz/>}/>
      <Route  path='/getCourses' element={<GetCourses/>}/>
      <Route path='/courses/:cname' element={<CourseDetails/>} />
      <Route path='/addTest' element={<AddTest/>} />
      <Route path='/home' element={<Studenthomepage/>} />
      <Route path='/courses/:course/:subject/:chapter' element={<Createquiz/>} /> */}

      {/* Protected Routes */}
      {/* <Route path="/login" element={<LoginComponent />}/>
      
      <Route path='/home' element={<Studenthomepage/>} />
      <Route  path='/teacherHomePage' element={<GetCourses/>}/> */}
      
      <Route
        path="/teacherregister"
        element={
          <ProtectedRoute  allowedRoles={['registerorLogin']}>
            <RegisterTeacher/>
          </ProtectedRoute>
        }
      />
        <Route
        path="/teacherlogin"
        element={
          <ProtectedRoute  allowedRoles={['registerorLogin']}>
            <LoginTeacher/>
          </ProtectedRoute>
        }
      />


       <Route
        path="/register"
        element={
          <ProtectedRoute  allowedRoles={['registerorLogin']}>
            <RegisterComponent/>
          </ProtectedRoute>
        }
      />


        <Route
        path="/login"
        element={
          <ProtectedRoute  allowedRoles={['registerorLogin']}>
            <LoginComponent/>
          </ProtectedRoute>
        }
      />

       <Route
        path="/studentHomePage"
        element={
          <ProtectedRoute  allowedRoles={['studenthome']}>
            <Studenthomepage/>
          </ProtectedRoute>
        }
      />

     <Route
        path="/teacherHomePage"
        element={
          <ProtectedRoute  allowedRoles={['teacherhome']}>
            <TeacherHomePage/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/addTest"
        element={
          <ProtectedRoute  allowedRoles={['teacheraddTest']}>
            <AddTest/>
          </ProtectedRoute>
        }
      />


       <Route
        path="/courses/:cname"
        element={
          <ProtectedRoute  allowedRoles={['course']}>
            <CourseDetails/>
          </ProtectedRoute>
        }
      />
       <Route path='/courses/:course/:subject/:chapter' element={<Createquiz/>} /> 

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
