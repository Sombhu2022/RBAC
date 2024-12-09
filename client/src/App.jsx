import { ToastContainer } from 'react-toastify';
import Register from './views/auth/Register';
import Layout from './views/Layout/Layout';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './views/home/Home';
import ErrorPage from './views/error/ErrorPage';
import Login from './views/auth/Login';
import './global.css';
import Profile from './views/auth/Profile';
import { authenticateUser } from './store/user/userController';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import BlogDetails from './views/blog/Components/BlogDetails';
import { fetchAllBlogs } from './store/blog/blogController';
import BlogPage from './views/blog/BlogPage';
import DashBoard from './views/dashboard/DashBoard';
import EditBlog from './views/blog/Components/EditBlog';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticate } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(authenticateUser());
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  // Mouse event for golden spotlight
  // useEffect(() => {
  //   const goldenSpotlight = document.getElementById('golden-spotlight');

  //   const handleMouseMove = (e) => {
  //     goldenSpotlight.style.left = `${e.pageX}px`;
  //     goldenSpotlight.style.top = `${e.pageY}px`;
  //   };

  //   document.body.addEventListener('mousemove', handleMouseMove);

  //   // Cleanup event listener when component unmounts
  //   return () => {
  //     document.body.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Golden Spotlight element */}
      <div id="golden-spotlight" className="golden-spotlight"></div>

      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blog/:blogId" element={<BlogDetails />} />
            <Route path="/blog/edit/:blogId" element={<EditBlog />} />

            {isAuthenticate && <Route path="/dashboard" element={<DashBoard />} />}
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// export const baseUrl = 'http://localhost:8080/api/v1';
export const baseUrl = 'https://codecanvasserver.vercel.app/api/v1';
