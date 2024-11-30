import axios from "axios";
import React, { useState, useEffect } from "react";
import "./altApp.css";
import Navbar from "./components/navBar";

const Insights = () => {
  // Mock leaderboard data
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "Rohaan", points: 150 },
    { rank: 2, name: "Ramis", points: 135 },
    { rank: 3, name: "Ahmed", points: 129 },
    { rank: 15, name: "You", points: 89 },
  ]);

  const [studentCourses, setStudentCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalQuizCount, setTotalQuizCount] = useState(0); // Store total quiz count for all courses
  const [studentQuizCount, setStudentQuizCount] = useState(0); // Store student quiz count
  const [quizPercentage, setQuizPercentage] = useState(null);

  // Fetch enrolled courses for the current user
  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/enroll/getEnrolledCourses', {
        withCredentials: true,
      });
      setStudentCourses(response.data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch total quiz count for each enrolled course
  const fetchTotalQuizCount = async () => {
    let totalQuiz = 0;
    try {
      for (const course of studentCourses) {
        const response = await axios.get(`http://localhost:8000/test/getTotalQuizCount/${course}/`);
        totalQuiz += response.data.total_quiz_count; // Assuming the response contains total_quiz_count
      }
      setTotalQuizCount(totalQuiz);
    } catch (error) {
      console.error('Error fetching total quiz count:', error);
    }
  };

  // Fetch quiz count for the student
  const fetchStudentQuizCount = async () => {
    const studentName = localStorage.getItem("user"); // Get student name from localStorage
    try {
      const response = await axios.get(`http://localhost:8000/taketest/getStudentQuizCount/${studentName}/`);
      setStudentQuizCount(response.data.quiz_count); // Assuming response contains quiz_count
    } catch (error) {
      console.error('Error fetching student quiz count:', error);
    }
  };

  const calculateQuizCompletionPercentage = () => {
    if (totalQuizCount > 0) {
      const percentage = (studentQuizCount / totalQuizCount) * 100;
      setQuizPercentage(percentage.toFixed(2));  // Store percentage with 2 decimal places
    }
  };

  // Use effect to fetch data when component mounts
  useEffect(() => {
    fetchEnrolledCourses(); // Fetch enrolled courses
  }, []);

  useEffect(() => {
    if (studentCourses.length > 0) {
      fetchTotalQuizCount(); // Fetch total quiz count once courses are fetched
      fetchStudentQuizCount(); // Fetch student quiz count once courses are fetched
    }
  }, [studentCourses]); // This runs when studentCourses state changes

  useEffect(() => {
    if (totalQuizCount > 0 && studentQuizCount >= 0) {
      calculateQuizCompletionPercentage();  // Recalculate the percentage when counts change
    }
  }, [totalQuizCount, studentQuizCount]);

  return (
    <>
      <Navbar />
      <div className="InsightsBackground">
        {/* Content Container for Leaderboard and Performance Section */}
        <div className="content-container">
          {/* Leaderboard Section */}
          <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            {/* Key Section */}
            <div className="leaderboard-key">
              <span className="leaderboard-rank">rank</span>
              <span className="leaderboard-name">name</span>
              <span className="leaderboard-points">points</span>
            </div>
            {/* Leaderboard Rows */}
            <div className="leaderboard">
              {leaderboard.map((entry, index) => (
                <div
                  className={`leaderboard-row ${entry.name === "You" ? "highlight" : ""}`}
                  key={index}
                >
                  <div className="leaderboard-rank">{entry.rank}</div>
                  <div className="leaderboard-name">{entry.name}</div>
                  <div className="leaderboard-points">{entry.points}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Performance Section */}
          <div className="performance-container">
            <h2>Your Performance</h2>
            <div className="performance-details">
              <div className="performance-score">
                <span className="score-percentage">{quizPercentage}%</span>
                <p>Absolute Performance Indicator</p>
              </div>
              <p className="performance-rank">Rank = 15</p>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators Section */}
        <div className="kpi-container">
          <h2>Key Performance Indicators</h2>
        </div>
      </div>
    </>
  );
};

export default Insights;
