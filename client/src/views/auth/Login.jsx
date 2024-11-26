import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";  // Import Link for navigation
import EmailVerification from "./components/EmailVerification";
import { fromJSON } from "postcss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/user/userController";
import { resetState } from "../../store/user/userSlice";
import { toast } from "react-toastify";

const Login = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

  const [step, setStep] = useState(1); // Step 1 = Login, Step 2 = OTP verification
  const [isTwoStepAuth, setIsTwoStepAuth] = useState(false); // Dynamically set based on user profile
  const [userId, setUserId] = useState(null); // Store userId for OTP verification
  const dispatch = useDispatch()
  const { user, status, message , isAuthenticate , loading} = useSelector((state) => state.user);
  const navigate = useNavigate()
 

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({email , password}))
  };

  // Handle status updates
  useEffect(() => {
    if (status.loginUser === 'success' && !isAuthenticate ) {
      setIsTwoStepAuth(user.isTwoStepAuth);
      setStep(2);
      if (message) {
        toast.success(message);
      }
      dispatch(resetState());
    } else if (status.loginUser === 'success') {
      toast.success(message); // Show error message
      dispatch(resetState());
      navigate('/')
    }
    else if (status.loginUser === 'rejected') {
      toast.error(message); // Show error message
    }
  }, [message, status , user ]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {step === 1 ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="custom_input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="custom_input"
              required
            />
            <button className="custom_button">
             {loading.loginUserLoading? 'Loading...':'Login'}
            </button>

            <div className="text-center mt-4">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div className="text-center mt-2">
            Don't have an account?
              <Link to="/register" className="text-blue-500 hover:underline">
                 Register
              </Link>
            </div>
          </form>
        ) : (
          <EmailVerification email={email} subject="Two-Step Verification" />
        )}
      </div>
    </div>
  );
};

export default Login;
