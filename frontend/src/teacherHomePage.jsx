import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './teacherHomepage.css'
import Navbar from './Navbar'; //please make sure that this file is present and in updated format (shared as well)

function  TeacherHomePage() {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [chapters, setChapters] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/test/getCourses', {
          withCredentials: true,
        });
        setCourses(response.data);
        
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const fetchSubjects =async(course) => {
    try {
      const response = await axios.get(`http://localhost:8000/test/getSubjects/`, {
        withCredentials: true,
        params: {
          course:course
        },
      });
      setSubjects((prevSubjects) => ({
        ...prevSubjects,
        [course]: response.data,
      }));
    } catch (err) {
      console.error(err);
    }
    console.log('me is subject')
  };

  const fetchChapters = async(course, subject) => {
    try {
      const response = await axios.get(`http://localhost:8000/test/getChapters/`, {
        withCredentials: true,
        params: {
          subject:subject
        },
      });
      setChapters((prevChapters) => ({
        ...prevChapters,
        [`${course}-${subject}`]: response.data,
      }));
    } catch (err) {
      console.error(err);
    }
    
  };

  return (
    <div>
      <Navbar />
    <h1 className="title">My Courses</h1>
    <div className="teacher-homepage">
      
      <div className="teacher-homepage-inner">
      {courses.length > 0 ? (
        <ul className="course-list">
          {courses.map((course, index) => (
            <li key={index} className="course-item">
              <div className="course-header">
                <span className="course-name">{course}</span>
                <button
                  className="dropdown-button"
                  onClick={() => fetchSubjects(course)}
                >
                  View Subjects
                </button>
              </div>
              {subjects[course] && (
                <ul className="subject-list">
                  {subjects[course].map((subject, subjIndex) => (
                    <li key={subjIndex} className="subject-item">
                      <div className="subject-header">
                        <span className="subject-name">{subject}</span>
                        <button
                          className="dropdown-button"
                          onClick={() => fetchChapters(course, subject)}
                        >
                          View Chapters
                        </button>
                      </div>
                      {chapters[`${course}-${subject}`] && (
                        <ul className="chapter-list">
                          {chapters[`${course}-${subject}`].map(
                            (chapter, chapIndex) => (
                              <li key={chapIndex} className="chapter-item">
                                <Link
                                  to={`/addTest?course=${course}&subject=${subject}&chapter=${chapter}`}
                                  className="chapter-link"
                                  onClick={() =>
                                    navigate(
                                      `/addTest?course=${course}&subject=${subject}&chapter=${chapter}`
                                    )
                                  }
                                >
                                  {chapter}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
  
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <p className="no-courses">No courses found.</p>
      )}
      </div>

    </div>

    <button className = "teacher-discussion-button">Discuss</button>

    </div>
  );
}

export default TeacherHomePage;
