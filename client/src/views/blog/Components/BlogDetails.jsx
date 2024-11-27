import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogByBlogId } from "../../../store/blog/blogController";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { blogId } = useParams(); // Get the blog ID from the route
  const { blog, loading, message, status } = useSelector((state) => state.blog);
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
    if (status.fetchBlogByBlogId === "success") {
      toast.success(message);
    } else if (status.fetchBlogByBlogId === "rejected") {
      toast.error(message);
    }
  }, [status, message]);

  // Loading state
  if (loading.fetchBlogByBlogIdLoading) {
    return <p className="text-center min-h-screen font-bold">Loading...</p>;
  }

  // If no blog is found
  if (!blog) {
    return <p className="text-center min-h-screen text-red-500 font-bold">Blog not found!</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          {blog.user?.name}'s Blog
        </h1>

        {/* Blog Image */}
        {blog.image?.url && (
          <div className="w-full mb-6">
            <img
              src={blog.image.url}
              alt={blog.title || "Blog image"} // Improved alt text for accessibility
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-gray-800 text-lg leading-relaxed">{blog.content}</p>
        </div>

        {/* Reactions */}
        <div className="flex items-center justify-center mt-6 text-gray-600">
          <FaHeart className="text-red-500 mr-2 text-xl" />
          <span className="text-lg font-semibold">{blog.reaction?.length} People Reacted</span>
        </div>

        {/* Comments Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Comments</h2>
          <div className="space-y-4">
            {blog.comments?.length > 0 ? (
              blog.comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
                >
                  <p className="text-gray-700">{comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments available yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
