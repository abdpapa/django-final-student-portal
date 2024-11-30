import axios from "axios";
import React, { useState, useEffect } from "react";
import "./altApp.css";
import CoursesSidebar from "./components/CoursesSideBar";
import CommentBanner from "./components/CommentBanner";
import Navbar from "./components/navBar";

const Forum = ({ courseName }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const name = localStorage.getItem("user");

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/userposts/posts/${courseName}/`);
      if (response.data.status === "success") {
        console.log("Posts fetched successfully:", response.data.data);
        setPosts(response.data.data);
        console.log(posts[0]);
      } else {
        console.error("Failed to fetch posts:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [courseName]);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleAddPost = async () => {
    if (postText.trim()) {
      setPostText("");  // Clear the textarea
      setPopupVisible(false);  // Close the popup
  
      try {
        // Send the new post data to the backend
        const postData = {
          username: name,          // Current user's name
          courseName: courseName,  // Name of the course
          textData: postText,      // The content of the post
        };
  
        const response = await axios.post('http://localhost:8000/userposts/add/', postData);
  
        const fetchResponse = await axios.get(`http://localhost:8000/userposts/posts/${courseName}/`);
        const fetchedPosts = fetchResponse.data.data;
  
        setPosts(fetchedPosts);
  
        console.log('Post added and posts reloaded:', fetchedPosts);
      } catch (error) {
        console.error('Error adding post or fetching posts:', error.response ? error.response.data : error.message);
      }
    } else {
      alert("Post cannot be empty!");
    }
  };

  return (
    <>
    <Navbar />
      <div className="newHomeBackground">
        <CoursesSidebar courses={["Math", "Science", "History"]} />

        <div className="mainContent">
          <div className="courseBorderBanner">
            <div className="courseBanner">
              <h2>{courseName} Forum</h2>
            </div>
          </div>

          <button className="circularButton" onClick={togglePopup}>
            +
          </button>

          {isPopupVisible && (
            <div className="popupOverlay" onClick={togglePopup}>
              <div className="popupContent" onClick={(e) => e.stopPropagation()}>
                <h2>Add Post</h2>
                <textarea
                  placeholder="Write your post..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
                <button className="addPostButton" onClick={handleAddPost}>
                  Add Post
                </button>
              </div>
            </div>
          )}

          <div className="postSectionBorderBanner">
            <div className="postSectionBanner">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <CommentBanner
                    key={index}
                    postText={[post.postByUser, post.textData, post.id]}
                  />
                ))
              ) : (
                <>
                <br />
                <br />
                <p>Be the first to post!</p>
                <br/>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forum;
