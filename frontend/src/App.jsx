
import './App.css';
import {Routes,Route} from 'react-router-dom'
import LoginComponent from './components/Login';
import Home from './home';
import RegisterComponent from './components/Register';
import RegisterTeacher from './components/RegisterTeacher';
import LoginTeacher from './components/LoginTeacher';
function App() {
  return (
    <div className="App">
     <Routes>
      <Route  path='/login' element={<LoginComponent/>}/>
      <Route  path='/home' element={<Home/>}/>
      <Route  path='/register' element={<RegisterComponent/>}/>
      <Route  path='/teacherregister' element={<RegisterTeacher/>}/>
      <Route  path='/teacherlogin' element={<LoginTeacher/>}/>
     </Routes>
    </div>
  );
}

export default App;
