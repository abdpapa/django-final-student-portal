
//THE STUDENT COURSE PAGE WHEN HE CLICKS ON ONE OF THE BOXES


import "./coursedetails.css";
import React, { useEffect, useState } from "react";
import Topic from "./topic"; 
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
const CoursDetails = () => {


  const {cname}=useParams()
  
  const[subjects,setSubjects]=useState([])
 const[error,setError]=useState("")

   useEffect(()=>{
    const fetchSubjectsAndChapters=async (cname)=>{
      try {
        console.log(cname)
        const response = await axios.get('http://localhost:8000/taketest/getSubjects', {
            withCredentials: true,
            params:{
              cname:cname
            }
  
          });
            
            const data=response.data
            console.log("sub is"+data[0].chaps)
            setSubjects(data);
           

       
    } catch (error) {
        console.error('Error fetching subjects:', error);
        setError(error.message)
    }
    }
    fetchSubjectsAndChapters(cname);
   },[])
 
  


  
  
  return (
    <div className="scourse-page">
      <h1 className="scourse-title">{cname}</h1>
     
     
      {subjects && <div className="stopic-list">
        {subjects.map((topic, index) => (
          <>
          <Topic key={index} index={index} name={topic.name} course={cname} />
          
            { topic.chaps.map((chapter)=>{
              return <Link to={`${topic.name}/${chapter}`}>{chapter}</Link>
            }) }
          
          </>

        ))}
      </div>
        }    
        {error && <p>{error}</p>} 
    </div>
  );
};

export default CoursDetails;
