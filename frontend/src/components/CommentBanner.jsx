import React, { useState, useEffect } from "react";
import axios from "axios";
import "../altApp.css";  // Make sure the CSS is properly imported

const CommentBanner = ({ postText = [] }) => {
  // State to track if the banner is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentText, setCommentText] = useState(""); // State to capture the input value
  const [comments, setComments] = useState([]); // State to hold the comments for this post

  // Toggle the expanded state on click
  const handleBannerClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to render comments dynamically
  const renderComments = () => {
    return comments.map((comment, index) => (
      <div key={index} className="comment">
        <strong>{comment.username}</strong>: {comment.textData}
      </div>
    ));
  };

  // Function to handle the input change
  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  // Function to handle submitting the comment when Enter is pressed
  const handleCommentSubmit = async (e) => {
    if (e.key === "Enter" && commentText.trim() !== "") {
      const postID = postText[2];  // Get the post ID from the prop (postText[0]) //change to post id true [2]
      const username = localStorage.getItem("user");  // Get the username from localStorage

      try {
        // Make an API request to add the comment to the backend
        const response = await axios.post("http://localhost:8000/userposts/addComment/", {
          postid: postID,
          username: username,
          textData: commentText,
        });

        if (response.data.status === "success") {
          // Update the comment list after successfully adding the comment
          setComments([...comments, { username, textData: commentText }]);
          setCommentText(""); // Clear the input field
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  // Fetch comments when the banner expands
  useEffect(() => {
    const fetchComments = async () => {
      if (isExpanded) {
        const postID = postText[2];  // Get the post ID from the prop (postText[0])

        try {
          // Make an API request to get comments for this post
          const response = await axios.get(`http://localhost:8000/userposts/comments/${postID}/`);

          if (response.data.status === "success") {
            // Set the fetched comments in the state
            setComments(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchComments();
  }, [isExpanded, postText]);

  return (
    <div className="postBannerWrapper">
      <div className="postBanner" onClick={handleBannerClick}>
        <div className="postBannerContent">
          {postText[0]} <br />
          <br />
          {postText[1]}
        </div>
        <div className="separatorLine"></div>
        <input
          className="commentInput"
          type="text"
          value={commentText} // Bind the input field to the state
          onChange={handleInputChange} // Update state when input changes
          onKeyDown={handleCommentSubmit} // Handle Enter key press
          placeholder="Add comment"
        />
      </div>

      {/* Show the expanded comment section when isExpanded is true */}
      {isExpanded && (
        <div className="expandedCommentsSection">
          <div className="commentsHeader">Comments</div>
          <div className="commentsList">
            {renderComments()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentBanner;
