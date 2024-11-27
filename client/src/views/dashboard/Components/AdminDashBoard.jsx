import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserWithPost, updateUserRole } from "../../../store/user/userController";
import { toast } from "react-toastify";
import AllPosts from "./AllPosts";
import { resetState } from "../../../store/user/userSlice";

function AdminDashBoard() {
  const dispatch = useDispatch();
  const { users, loading, status, message } = useSelector((state) => state.user);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [showPostsModal, setShowPostsModal] = useState(false);

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole({ userId, newRole }))
  };

  // Fetch all users and their posts
  useEffect(() => {
    dispatch(fetchAllUserWithPost());
  }, [dispatch , status.updateUserRole]);

  // Toast notifications based on status
  useEffect(() => {
    if (status.fetchAllUser === "success" || status.updateUserRole === "success"  ) {
      toast.success(message);
      dispatch(resetState())
    } else if (status.fetchAllUser === "rejected" || status.updateUserRole === "success" ) {
      toast.error(message);
    }
    
  }, [status, message]);

  


  // Show posts in modal
  const handleShowPosts = (posts) => {
    setSelectedPosts(posts);
    setShowPostsModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {loading.fetchAllUserLoading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Verified</th>
                <th className="px-4 py-2">Total Posts</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Updated At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`${
                        user.role === "admin"
                          ? "text-green-500"
                          : user.role === "user"
                          ? "text-blue-500"
                          : "text-red-600"
                      } font-semibold`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      className={`${
                        user.isVerify ? "text-green-500" : "text-red-600"
                      } font-semibold`}
                    >
                      {user.isVerify ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{user.totalPosts}</td>
                  <td className="border px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 flex flex-col gap-3">
                    {user.role === "user" &&(
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg mr-2"
                        onClick={() => handleRoleChange(user._id, "controller")}
                      >
                        Make Controller
                      </button>
                    )}
                    {user.role === "controller" && (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg"
                        onClick={() => handleRoleChange(user._id, "user")}
                      >
                        Demote to User
                      </button>
                    )}
                   
                    <button
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-lg"
                      onClick={() => handleShowPosts(user.posts)}
                    >
                      Show All Posts
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPostsModal && (
        <AllPosts
          posts={selectedPosts}
          onClose={() => setShowPostsModal(false)}
        />
      )}
    </div>
  );
}

export default AdminDashBoard;
