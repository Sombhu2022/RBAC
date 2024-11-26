import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgDetailsMore, CgProfile } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";
import { BiLogInCircle, BiHomeCircle, BiSolidDashboard } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/user/userController";
import { resetState } from "../../store/user/userSlice";
import { toast } from "react-toastify";



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticate , status , loading , message } = useSelector((state) => state.user);
  const navigate = useNavigate();
 
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
  };

  // Handle status updates
  useEffect(() => {
    if (status.logoutUser === 'success') {
      if (message) {
        toast.success(message);
      }
      dispatch(resetState());
    } else if (status.logoutUser === 'rejected') {
      toast.error(message); // Show error message
    }
  }, [message, status]);

  return (
    <header className="relative p-4 w-full flex justify-between items-center bg-white border border-gray-200 shadow-md">
      <h2 className="text-3xl font-bold text-gray-800">CodeCanvas</h2>
      <nav className="flex items-center gap-4">
        <button
          onClick={isAuthenticate ? handleLogout : () => navigate("/login")}
          className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-full text-white transition-colors ${
            isAuthenticate
              ? "bg-indigo-500 hover:bg-indigo-600"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {isAuthenticate ? "Logout" : "Login"} <BiLogInCircle />
        </button>

        <button
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          {menuOpen ? (
            <MdOutlineClose className="text-2xl text-gray-700" />
          ) : (
            <CgDetailsMore className="text-2xl text-gray-700" />
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="absolute top-16 right-3 bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col gap-2 p-4 w-48">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="nav_links"
          >
            <BiHomeCircle className="text-xl" /> Home
          </NavLink>
          <NavLink
            to="/profile"
            onClick={toggleMenu}
            className="nav_links"          >
            <CgProfile className="text-xl" /> Profile
          </NavLink>
          {isAuthenticate && (
            <NavLink
              to="/dashboard"
              onClick={toggleMenu}
              className="nav_links"            >
              <BiSolidDashboard className="text-xl" /> Dashboard
            </NavLink>
          )}
         
        </div>
      )}
    </header>
  );
};

export default Header;
