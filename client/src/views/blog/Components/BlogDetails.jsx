import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaBan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { blockABlogPost, fetchBlogByBlogId } from "../../../store/blog/blogController";
import { toast } from "react-toastify";
import { resetBlogState } from "../../../store/blog/blogSlice";

const BlogDetails = () => {
  const { blogId } = useParams(); // Get the blog ID from the route
  const { blog, loading, message, status } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user); // Assuming user details are stored in auth
  const dispatch = useDispatch();

  // Fetch blog details based on the blogId
  const fetchBlog = () => {
    dispatch(fetchBlogByBlogId({ blogId }));
  };

  // Fetch blog when the component mounts or the blogId changes
  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  // Handle toast notifications based on status
  useEffect(() => {
    if (status.fetchBlogByBlogId === "success" || status.blockABlogPost === "success") {
      toast.success(message);
      dispatch(resetBlogState())
    } else if (status.fetchBlogByBlogId === "rejected" || status.blockABlogPost === "success") {
      toast.error(message);
    }
  }, [status, message]);

  // Handle blocking the blog
  const handleBlockPost = () => {
    dispatch(blockABlogPost({ blogId }));
  };

  // Show toast notification for block post action
  useEffect(() => {
    if (status.blockBlogPost === "success") {
      toast.success("Blog post blocked successfully!");
    } else if (status.blockBlogPost === "rejected") {
      toast.error("Failed to block blog post.");
    }
  }, [status]);

  // Loading state
  if (loading.fetchBlogByBlogIdLoading) {
    return <p className="text-center min-h-screen font-bold">Loading...</p>;
  }

  // If no blog is found
  if (!blog) {
    return (
      <p className="text-center min-h-screen text-red-500 font-bold">
        Blog not found!
      </p>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Blog Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            {blog.user?.name}'s Blog
          </h1>
          {/* Block Post Button */}
          {(user?.role === "admin" || user?.role === "controller") && (
            <button
              onClick={handleBlockPost}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              <FaBan className="mr-2" />
              Block Post
            </button>
          )}
        </div>

        {/* Blog Image */}
        {blog.image?.url && (
          <div className="w-full mb-6">
            <img
              src={blog.image.url}
              alt={blog.title || "Blog image"}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 text-lg leading-relaxed">{blog.content}</p>
        </div>

        {/* Reactions */}
        <div className="flex items-center justify-between mt-6 text-gray-600">
          <div className="flex items-center">
            <FaHeart className="text-red-500 mr-2 text-xl" />
            <span className="text-lg font-semibold">
              {blog.reactions?.length} People Reacted
            </span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Comments</h2>
          <div className="space-y-4">
            {blog.comments?.length > 0 ? (
              blog.comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-white p-4 md:p-6 rounded-lg shadow-md border-l-4 border-blue-500"
                >
                  <p className="text-gray-700">{comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No comments available yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
