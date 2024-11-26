import React, { useState } from "react";

const AddBlog = ({ onAddBlog }) => {
  // States for blog fields
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!content.trim()) {
      setError("Content is required.");
      return;
    }

    const newBlog = {
      image,
      content,
    };

    onAddBlog(newBlog); // Pass the new blog to the parent or API
    resetForm(); // Reset form after submission
  };

  // Reset form fields
  const resetForm = () => {
    setImage(null);
    setContent("");
    setError("");
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
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
              className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
              Blog Content
            </label>
            <textarea
              id="content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700"
              placeholder="Write your blog content here..."
            ></textarea>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
