import React from "react";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

const Blog = () => {
  const demoBlogs = [
    {
      _id: "1",
      user: {
        _id: "101",
        name: "John Doe",
      },
      image: {
        url: "https://via.placeholder.com/150",
      },
      content: "This is a sample blog post about coding best practices.",
      comments: ["Great post!", "Very informative.", "Loved it!"],
      reaction: ["User1", "User2", "User3"],
      createdAt: "2024-11-20T12:34:56",
    },
    {
      _id: "2",
      user: {
        _id: "102",
        name: "Jane Smith",
      },
      image: {
        url: "https://via.placeholder.com/150",
      },
      content: "An introduction to MongoDB and Mongoose.",
      comments: ["Nice article!", "Thanks for sharing."],
      reaction: ["User1", "User3"],
      createdAt: "2024-11-22T08:15:30",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Blog Image */}
              {blog.image?.url && (
                <img
                  src={blog.image.url}
                  alt="Blog"
                  className="w-full h-48 object-cover"
                />
              )}
              {/* Blog Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {blog.user.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mt-4">{blog.content}</p>
              </div>
              {/* Blog Footer */}
              <div className="px-6 py-4 bg-gray-100 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-600">
                    <FaHeart className="mr-1 text-red-500" />
                    <span>{blog.reaction.length}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaRegComment className="mr-1 text-blue-500" />
                    <span>{blog.comments.length}</span>
                  </div>
                </div>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
