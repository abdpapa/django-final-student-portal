//ROUTE PROTECTION

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

 const ProtectedRoute = ({ children, allowedRoles }) => {

  

 const currentuser = localStorage.getItem('user'); // Retrieve current user
  const isStudent = localStorage.getItem('is_student'); // Retrieve user role
   console.log(currentuser)
   
 
  if(currentuser && allowedRoles.includes("registerorLogin")){
    if(isStudent==="true"){
      return <Navigate to="/studentHomePage" replace />
    }
    else 
    return <Navigate to="/teacherHomePage" replace />
  }

  if(!currentuser && (allowedRoles.includes("teacherhome")|| allowedRoles.includes("studenthome"))){

    //FAHAD IS MAKING THIS START SCREEN
    return <Navigate to="/startscreen" replace />
  }

  if(currentuser && allowedRoles.includes("teacherhome")){
    if(isStudent==="true")
    return <Navigate to="/studentHomePage" replace />
  }

  if(currentuser && allowedRoles.includes("studenthome")){
    if(isStudent==="false")
    return <Navigate to="/teacherHomePage" replace />
  }

  if(!currentuser && allowedRoles.includes("teacheraddTest")){
   
    return <Navigate to="/teacherlogin" replace />
  }

  if(currentuser && allowedRoles.includes("teacheraddTest") && isStudent==="true"){
   
    return <Navigate to="/studentHomePage" replace />
  }

  if(currentuser && allowedRoles.includes("course") && isStudent==="false"){
   
    return <Navigate to="/teacherHomePage" replace />
  }

  if(!currentuser && allowedRoles.includes("course")){
   
    return <Navigate to="/login" replace />
  }

  



  return children; // Render protected content
};
export default ProtectedRoute;
