import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchBlogByBlogId, updateBlog } from "../../../store/blog/blogController";
import { resetBlogState } from "../../../store/blog/blogSlice";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  // Form States
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { blogId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { blog, loading, status, message } = useSelector((state) => state.blog);

  // Fetch Blog Data
  useEffect(() => {
    dispatch(fetchBlogByBlogId({ blogId }));
  }, [blogId, dispatch]);

  // Populate Form with Blog Data
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContent(blog.content || "");
      setShowImage(blog.image?.url || null);
    }
  }, [blog]);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.set("title", title);
    formData.set("content", content);

    dispatch(updateBlog({ formData, blogId }));
  };

  // Handle Status Updates
  useEffect(() => {
    if (status.updateBlog === "success") {
      toast.success(message || "Blog updated successfully!");
      dispatch(resetBlogState());
      navigate("/blogs"); // Navigate to blog list or desired route
    } else if (status.updateBlog === "rejected") {
      toast.error(message || "Failed to update blog.");
    }
  }, [status.updateBlog, message, dispatch, navigate]);

  // Reset Form
  const resetForm = () => {
    setImage(null);
    setShowImage(null);
    setTitle("");
    setContent("");
    setError("");
  };

 // Handle image change
 const handleImageChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result);
    setShowImage(reader.result)
  };
  reader.readAsDataURL(file);
};


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Edit Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
              Blog Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showImage && (
              <div className="mt-4">
                <img
                  src={showImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                />
              </div>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
              Blog Content
            </label>
            <textarea
              id="content"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Reset
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                loading.updateBlogLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading.updateBlogLoading}
            >
              {loading.updateBlogLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
