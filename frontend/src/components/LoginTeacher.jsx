// LoginComponent FOR STUDENT



import { useState } from 'react';
//import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginTeacher() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[error,setError]=useState("")
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8000/auth/teacherlogin/", {
                username,
                password,
              },{ withCredentials: true });
              const {usernames,is_student} = response.data;
              
            if (response.data.status==="success"){
                
                localStorage.setItem('user', usernames);
                localStorage.setItem('is_student', is_student);
                navigate("/teacherHomePage",{ replace: true });
            }
        }
        catch(err){
            
            console.log(err)
            setError(err.message)
        }
       
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
            {error &&<p>{error}</p>}
        </form>
    );
}

export default LoginTeacher;

