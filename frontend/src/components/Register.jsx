//REGISTER A STUDENT
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'
function RegisterComponent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[error,setError]=useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/auth/studentregister/', {
                username,
                email,
                password,
              });
            if (response.data.status==="success"){
                navigate('/login',{ replace: true });
            }
            else{
                alert("some problem occured")
            }
              
         

             
        }
        catch(err){
            console.log(err)
            setError(error.message)
        }
       
    };

    return (
        <div className='register-page'>
            <div className='register-form-area'>
                <form onSubmit={handleSubmit} className='register-form'>
                    <p>Username</p>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <p>Email</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <p>Password</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button type="submit">Register</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
            <div className='register-text-area'>
                <p>
                Your journey
                <br />
                Towards learning
                <br />
                Starts here!
                </p>  
            </div>
        </div>
    );
}

export default RegisterComponent;

