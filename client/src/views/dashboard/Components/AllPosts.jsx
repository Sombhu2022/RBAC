import React from 'react'
import { Link } from 'react-router-dom';

function AllPosts({posts , onClose}) {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-h-[80%] overflow-y-auto p-6">
            <div className="flex w-full justify-end items-center">
              <button
                className="text-2xl text-red-500 font-bold"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">All Posts</h2>
            {posts.length > 0 ? (
              <ul className="space-y-4">
                {posts.map((post, index) => (
                  <li key={post._id} className="border-b pb-2">
                    <Link to={`/blog/${post._id} `}>
                    <h3 className="text-lg font-semibold">
                      {index + 1}. {post.title}
                    </h3>
                    <p className="text-sm text-gray-600">{post.content}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No posts available.</p>
            )}
          </div>
        </div>
      );
}

export default AllPosts