import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import AddBlog from "./Components/AddBlog";
import Blog from "./Components/Blog";

const BlogPage = () => {
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);
  const { isAuthenticate } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);
  const blogState = useSelector((state) => state.blog);

  useEffect(() => {
    if (blogState.blogs.length > 0) {
      setBlogs(blogState.blogs);
    }
  }, [blogState]);

  const handleAddBlog = () => {
    setIsAddBlogOpen(!isAddBlogOpen);
  };

  return (
    <div className="bg-[#ffffff91] min-h-screen py-8  backdrop:blur-md">
      <div className="container mx-auto px-4">
        {/* Add Blogs Button */}
        {isAuthenticate && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleAddBlog}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Add Blog
            </button>
          </div>
        )}

        {/* Blog List */}
        <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
        <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-6 justify-items-center w-full sm:max-w-[500px] md:max-w-[700px] ">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border shadow-lg rounded-lg overflow-hidden w-full "
            >
              <Blog blog={blog} />
            </div>
          ))}
        </div>

        </div>
      </div>

      {/* Add Blog Modal */}
      {isAddBlogOpen && (
        <div className="popup_container">
          <AddBlog onClose={() => setIsAddBlogOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default BlogPage;
