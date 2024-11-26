import React, { useState } from "react";
import { FaHeart, FaRegComment, FaRegLaugh } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import { useSelector } from "react-redux";
import AddReactions from "./AddReactions";
import { toast } from "react-toastify";

function Blog({ blog }) {

    const user = useSelector((state)=>state.user)
  // State for new comment input and reactions
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(blog.comments); // Initialize with existing comments
  const [showReactionPopup, setShowReactionPopup] = useState(false);
  
  
  // Handle the reaction selection
  const handleReactionClick = () => {
    if (user.isAuthenticate) {
      setShowReactionPopup(!showReactionPopup);
    } else {
      toast.info('login first ! then access this fetures ')
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
     
      
      {/* Blog Content */}
      <div className="p-5">
        {/* Poster Details */}
        <div className="flex items-center mb-4">
          <img
            src={blog.user.profile_pic?.url || "https://via.placeholder.com/40"}
            alt={blog.user.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              {blog.user.name}
            </h2>
            <p className="text-xs text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">{blog.title}</h3>
        <p className="text-gray-700 text-sm line-clamp-3">{blog.content}</p>
      </div>


       {/* Blog Image */}
       {blog.image?.url && (
        <img
          src={blog.image.url}
          alt="Blog"
          className="w-full h-52 object-cover"
        />
      )}
      
      {/* Blog Footer */}
      <div className="px-5 py-3 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <FaHeart className="mr-1 text-red-500 cursor-pointer" onClick={handleReactionClick} />
            <span>{blog.reaction.length}</span>
          </div>
          <div className="flex items-center">
            <FaRegComment className="mr-1 text-blue-500" />
            <span>{comments.length}</span>
          </div>
        </div>
        <Link
          to={`/blog/${blog._id}`}
          className="text-blue-500 text-sm font-medium hover:underline"
        >
          Read More
        </Link>
      </div>
      
      {/* Reaction Popup */}


      {user.isAuthenticate && <AddReactions onClose={()=> setShowReactionPopup(false)} isShow={showReactionPopup}/>}

      {/* Comment Section */}
      <div className="p-5 bg-gray-50">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Comments</h4>
        
        {/* Display Existing Comments */}
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <p className="text-gray-700 font-semibold">{comment.user.name}</p>
              <p className="text-gray-600 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Add a New Comment */}
        {user.isAuthenticate && <AddComment />}
      </div>
    </div>
  );
}

export default Blog;
