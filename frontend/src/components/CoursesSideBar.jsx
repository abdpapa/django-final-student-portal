import React from "react";
import "../altApp.css"; 

const CoursesSidebar = ({ courses = [] }) => {
  return (
    <div className="settingsMenu">
      <ul>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))
        ) : (
          <li>No courses available</li>
        )}
      </ul>
    </div>
  );
};

export default CoursesSidebar;
