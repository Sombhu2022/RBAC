import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle, FaCogs, FaLifeRing } from "react-icons/fa";
import Blog from "../blog/Blog";

function Home() {
  const { user, isAuthenticate } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center">
            Welcome to CodeCanvas
          </h1>
          <p className="text-center mt-4 text-lg">
            Build, Innovate, and Grow with CodeCanvas!
          </p>
        </div>
      </header>

      {/* Features or Quick Links */}
      <section className="py-10 container mx-auto px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/profile"
            className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg hover:bg-blue-50"
          >
            <div className="text-blue-500 text-3xl mb-4">
              <FaUserCircle />
            </div>
            <h3 className="text-xl font-semibold">View Profile</h3>
            <p className="text-gray-600 mt-2">
              Manage your account details and preferences.
            </p>
          </Link>

          <Link
            to="/settings"
            className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg hover:bg-blue-50"
          >
            <div className="text-blue-500 text-3xl mb-4">
              <FaCogs />
            </div>
            <h3 className="text-xl font-semibold">Settings</h3>
            <p className="text-gray-600 mt-2">
              Configure your account and application settings.
            </p>
          </Link>

          <Link
            to="/help"
            className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg hover:bg-blue-50"
          >
            <div className="text-blue-500 text-3xl mb-4">
              <FaLifeRing />
            </div>
            <h3 className="text-xl font-semibold">Help Center</h3>
            <p className="text-gray-600 mt-2">
              Get assistance and explore our documentation.
            </p>
          </Link>
        </div>
      </section>

      <div className="w-screen flex justify-center items-center ">
         <Link to={'/blogs'} className="rounded-md bg-blue-600 text-white p-4"> Show Blogs </Link>
      </div>

      {/* User Details Section */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Dashboard
          </h2>
          {isAuthenticate ? (
            <div className="bg-gray-100 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Hello, {user?.name || "User"}!
              </h3>
              <p className="text-gray-600">
                Email: <span className="font-medium">{user?.email}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Role: <span className="font-medium">{user?.role}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Account Status:{" "}
                <span
                  className={`font-medium ${
                    user?.isVerify ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user?.isVerify ? "Verified" : "Not Verified"}
                </span>
              </p>
            </div>
          ) : (
            <div className="bg-red-100 text-red-600 p-6 rounded-lg">
              <p>You are not logged in. Please log in to view your details.</p>
              <Link to="/login" className="text-blue-500 underline mt-2 block">
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </section>

     
    </div>
  );
}

export default Home;
