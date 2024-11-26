import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import AddBlog from "./Components/AddBlog";
import Blog from "./Components/Blog";

const BlogPage = () => {
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);
  const { isAuthenticate } = useSelector((state) => state.user);
  const [ blogs , setBlogs ] = useState([])
  const blogState = useSelector((state)=> state.blog)

  useEffect(()=>{
    if(blogState.blogs.length > 0){
      setBlogs(blogState.blogs)
    }
  },[blogState])

  const handleAddBlog = () => {
    setIsAddBlogOpen(!isAddBlogOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
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
        <div className="flex flex-col justify-center items-center gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xl"
            >
             <Blog blog={blog}/>
            </div>
          ))}
        </div>
      </div>

      {/* Add Blog Modal */}
      {isAddBlogOpen && (
        <div className="popup_container">
          
            <AddBlog onClose={()=>setIsAddBlogOpen(false)}/>
         
        </div>
      )}
    </div>
  );
};

export default BlogPage;
