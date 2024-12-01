//THE STUDENT COURSE PAGE WHEN HE CLICKS ON ONE OF THE BOXES


import "./coursedetails.css";
import React, { useEffect, useState } from "react";
import Topic from "./topic"; 
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const CoursDetails = () => {
  const { cname } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjectsAndChapters = async () => {
      try {
        const response = await axios.get("http://localhost:8000/taketest/getSubjects", {
          withCredentials: true,
          params: { cname },
        });
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setError(error.message);
      }
    };

    fetchSubjectsAndChapters();
  }, [cname]);

  return (
    <>
    <Navbar/>
    <div className="scourse-page">
      <h1 className="scourse-title">{cname}</h1>

      {subjects.length > 0 && (
        <div className="stopic-list">
          {subjects.map((topic, index) => (
            <Topic
              key={index}
              index={index}
              name={topic.name}
              course={cname}
              chapters={topic.chaps}
            />
          ))}
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
    </>
  );
};

export default CoursDetails;