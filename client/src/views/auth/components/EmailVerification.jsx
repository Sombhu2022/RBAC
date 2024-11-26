import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpForProfileValidation, sendOtpForProfileValidation } from "../../../store/user/userController";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../../store/user/userSlice";
import { toast } from "react-toastify";

function EmailVerification({ email = "" , subject = 'Verify Email' }) {
  const [otp, setOTP] = useState("");
  const [timer, setTimer] = useState(300); // Timer starts at 300 seconds (5 minutes)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticate, loading, status, message } = useSelector((state) => state.user);

  // Function to format the timer (mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
  };

  // Handle OTP verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    dispatch(verifyOtpForProfileValidation({ otp , email }));
  };

  // Handle OTP resend
  const handleResendOtp = () => {
    setTimer(300); // Reset the timer to 5 minutes
    dispatch(sendOtpForProfileValidation({ email })); // Resend OTP to the user's email
  };

  // Start timer countdown
  useEffect(() => {
    if (timer === 0) {
      toast.error("OTP expired! Please request a new one.");
      return; // Stop the timer when it hits 0
    }

    const timerInterval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup interval on unmount
  }, [timer]);

  // Handle success/error after OTP verification
  useEffect(() => {
    if (status.verifyOtp === "success") {
      if (message) {
        toast.success(message);
      }
     
      navigate("/"); // Navigate to home or another page after success
    } else if (status.verifyOtp === "rejected") {
      toast.error(message); // Show error message
    }

    return () => {
      dispatch(resetState());
    };
  }, [message, status]);

  useEffect(()=>{
    if (status.sendOtp === "success") {
        if (message) {
          toast.success(message);
        }
        setTimer(300)
      } else if (status.sendOtp === "rejected") {
        toast.error(message); // Show error message
      }
  
      return () => {
        dispatch(resetState());
      };
  }, [loading.sendOtpLoading , status , message])

  return (
    <form onSubmit={handleOtpVerify}>
      <h2 className="text-2xl font-semibold text-center mb-6"> {subject} </h2>
      <p className="text-center mb-4 text-gray-600">
        An OTP has been sent to your email: <strong>{email}</strong>. Please check your email and verify.
      </p>
      <input
        type="number"
        name="otp"
        placeholder="Enter OTP"
        className="custom_input"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        required
      />
     
      {/* Show Resend OTP button if timer expired */}
      {timer === 0 && !loading.verifyOtpLoading ? (
        <div className="text-center mt-4">
          <button
            className="border-none outline-none bg-transparent text-blue-600"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
        </div>
      ):( <div className="text-center my-4">
        {<p>Time remaining: {formatTime(timer)}</p>}
      </div>)}
      <button
        className="custom_button"
        disabled={loading.verifyOtpLoading || timer === 0}
      >
        {loading.verifyOtpLoading ? "Loading..." : "Verify"}
      </button>
      
    </form>
  );
}

export default EmailVerification;
