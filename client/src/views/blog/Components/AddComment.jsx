import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";

function AddComment() {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]); // Initialize with an empty array, not a string

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // If comment input is not empty
    if (newComment.trim()) {
      // Add the new comment to the list of comments
      const updatedComments = [
        ...comments,
        { text: newComment, user: { name: "Anonymous" }, createdAt: new Date() }, // Assuming the new comment has an anonymous user
      ];
      setComments(updatedComments);
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <div className=""> {/* Center the form within this div */}
      <form onSubmit={handleCommentSubmit} className="flex gap-3 items-center ">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="custom_input rounded-full"
          rows="1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg "
        >
          <IoIosSend className="text-xl" />
        </button>
      </form>
    </div>
  );
}

export default AddComment;
