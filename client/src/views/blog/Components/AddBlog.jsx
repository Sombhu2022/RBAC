import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../../store/blog/blogController";
import { resetBlogState } from "../../../store/blog/blogSlice";
import { toast } from "react-toastify";

const AddBlog = ({ onAddBlog, onClose }) => {
  // Separate states for each form field
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { loading, status, message } = useSelector((state) => state.blog);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.set("title", title);
    formData.set("content", content);

    dispatch(createBlog(formData));
  };

  // Handle status updates
  useEffect(() => {
    if (status.createBlog === "success") {
      if (message) {
        toast.success(message);
      }
      dispatch(resetBlogState());
      resetForm();
    } else if (status.createBlog === "rejected") {
      toast.error(message); // Show error message
    }
  }, [message, status]);

  // Reset form fields
  const resetForm = () => {
    setImage(null);
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
      
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-gray-50 shadow-md rounded-md flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Add New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="custom_input"
            />
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
              className="custom_input"
              placeholder="Enter blog title"
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
              Blog Content
            </label>
            <textarea
              id="content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="custom_input"
              placeholder="Write your blog content here..."
            ></textarea>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              disabled={loading.createBlogLoading}
            >
              {loading.createBlogLoading ? "Loading..." : "Post Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
