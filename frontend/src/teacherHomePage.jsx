import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function  TeacherHomePage() {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [chapters, setChapters] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Fetch courses on component mount
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

  // Fetch subjects for a course
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
        [course]: response.data, // Save subjects for this course
      }));
    } catch (err) {
      console.error(err);
    }
    console.log('me is subject')
  };

  // Fetch chapters for a subject
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
        [`${course}-${subject}`]: response.data, // Save chapters for this subject
      }));
    } catch (err) {
      console.error(err);
    }
    
  };

  return (
    <div>
      <h1>My Courses</h1>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              <div>
                {/* Course name */}
                <span>{course}</span>
                {/* Dropdown button for subjects */}
                <button onClick={() => fetchSubjects(course)}>
                  View Subjects
                </button>
                {/* Render subjects if available */}
                {subjects[course] && (
                  <ul>
                    {subjects[course].map((subject, subjIndex) => (
                      <li key={subjIndex}>
                        <div>
                          {/* Subject name */}
                          <span>{subject}</span>
                          {/* Dropdown button for chapters */}
                          <button
                            onClick={() => fetchChapters(course, subject)}
                          >
                            View Chapters
                          </button>
                          {/* Render chapters if available */}
                          {chapters[`${course}-${subject}`] && (
                            <ul>
                              {chapters[`${course}-${subject}`].map(
                                (chapter, chapIndex) => (
                                  <li key={chapIndex}>
                                    {/* Chapter link */}
                                    <Link
                                      to={`/addTest?course=${course}&subject=${subject}&chapter=${chapter}`}
                                      onClick={() =>
                                        navigate(`/addTest?course=${course}&subject=${subject}&chapter=${chapter}`)
                                      }
                                    >
                                      {chapter}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
}

export default TeacherHomePage;
