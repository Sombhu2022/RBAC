import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import {
  deleteBlog,
  fetchAllBlogsOfEachUser,
} from "../../../store/blog/blogController";
import Blog from "../../blog/Components/Blog";
import EditBlog from "../../blog/Components/EditBlog";

function UserDashBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the Redux state
  const { myBlogs, loading, status, error } = useSelector(
    (state) => state.blog
  );

  // Fetch blogs on component mount
  useEffect(() => {
    dispatch(fetchAllBlogsOfEachUser());
  }, [dispatch]);


  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl text-center font-bold mb-4">My Blogs</h1>

      {/* Loading and Error Handling */}
      {loading.fetchAllBlogsOfEachUserLoading && <p>Loading blogs...</p>}
      {status.fetchAllBlogsOfEachUser === "rejected" && (
        <p className="text-red-500">Failed to fetch blogs: {error}</p>
      )}

      {/* Blog List */}
      <div className="space-y-4">
        {myBlogs.length === 0 && !loading.fetchAllBlogsOfEachUserLoading ? (
          <p>No blogs found. Start creating some!</p>
        ) : (
          <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-6 justify-items-center w-full sm:max-w-[500px] md:max-w-[700px] ">
          {myBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border shadow-lg rounded-lg overflow-hidden w-full "
            >
              <Blog blog={blog} />

            </div>
          ))}
        </div>

        </div>
        )}
      </div>
    </div>
  );
}

export default UserDashBoard;

