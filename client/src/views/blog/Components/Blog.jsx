import React, { useState, useRef, useEffect } from "react";
import {
  FaHeart,
  FaRegComment,
  FaRegLaugh,
  FaEllipsisV,
  FaShare,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AddComment from "./AddComment";
import { useDispatch, useSelector } from "react-redux";
import AddReactions from "./AddReactions";
import { toast } from "react-toastify";
import { CiSettings } from "react-icons/ci";
import { deleteBlog } from "../../../store/blog/blogController";
import AddReport from "../../report/AddReport";

function Blog({ blog }) {
  const user = useSelector((state) => state.user);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(blog.comments);
  const [showReactionPopup, setShowReactionPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, status, message } = useSelector((state) => state.blog);
  const [showReportPopup, setShowReportPopup] = useState(false);
  // Handle blog deletion
  const handleDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog({ blogId }));
    }
  };

  // Handle blog editing
  const handleEdit = (blogId) => {
    navigate(`/blog/edit/${blogId}`);
  };

  // Toggle reaction popup
  const handleReactionClick = () => {
    if (user.isAuthenticate) {
      setShowReactionPopup(!showReactionPopup);
    } else {
      toast.info("Login first! Then access this feature.");
    }
  };

  // Handle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle status updates
  useEffect(() => {
    if (status.deleteBlog === "success") {
      toast.success(message || "Blog deleted successfully!");
      dispatch(resetBlogState());
      navigate("/blogs");
    } else if (status.deleteBlog === "rejected") {
      toast.error(message || "Failed to delete blog.");
    }
  }, [status.deleteBlog, message, dispatch, navigate]);

  // Handle sharing the blog
  const handleShare = () => {
    const blogURL = `${window.location.origin}/blog/${blog._id}`;
    navigator.clipboard.writeText(blogURL);
    toast.success("Blog link copied to clipboard!");
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Settings Icon */}
     
        <div className="absolute top-3 right-3">
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={toggleDropdown}
          >
            <CiSettings size={18} className="font-semibold" />
          </button>
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10"
            >
               {user.isAuthenticate && user.user._id === blog.user._id && (
                <>
                <button
                onClick={() => handleEdit(blog._id)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
              >
                Delete
              </button>
                </>
               )}
              

              <button
                className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-blue-100"
                onClick={handleShare}
              >
                Copy Url
              </button>
            </div>
          )}
        </div>
      

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
            <FaHeart
              className="mr-1 text-red-500 cursor-pointer"
              onClick={handleReactionClick}
            />
            <span>{blog.reaction.length}</span>
          </div>
          <div className="flex items-center">
            <FaRegComment className="mr-1 text-blue-500" />
            <span>{comments.length}</span>
          </div>
          <button onClick={()=> setShowReportPopup(true)} className="text-red-500">
            <FaExclamationTriangle size={18} />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={`/blog/${blog._id}`}
            className="text-blue-500 text-sm font-medium hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>

      {/* Reaction Popup */}
      {user.isAuthenticate && (
        <AddReactions
          onClose={() => setShowReactionPopup(false)}
          isShow={showReactionPopup}
        />
      )}

      {/* Comment Section */}
      <div className="p-5 bg-gray-50">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Comments</h4>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <p className="text-gray-700 font-semibold">{comment.user.name}</p>
              <p className="text-gray-600 text-sm">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
        {user.isAuthenticate && <AddComment />}
      </div>

       {/* Add Report Popup */}
       {showReportPopup &&  <div className="popup_container"><AddReport blogId={blog._id} onClose={() => setShowReportPopup(false)} /></div>}
    </div>
  );
}

export default Blog;
