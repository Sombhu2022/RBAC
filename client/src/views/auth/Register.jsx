import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import EmailVerification from "./components/EmailVerification";
import UserDetailsForRegister from "./components/UserDetailsForRegister";

const Register = () => {
  const [step, setStep] = useState(1); // Manage step: 1 = Register, 2 = Verify
  const [email , setEmail] = useState('')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        {/* Progress Bar */}
        <div className="w-full max-w-lg mb-8">
          <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300`}
              style={{ width: step === 1 ? "50%" : "100%" }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className={step === 1 ? "font-semibold text-blue-500" : "text-gray-500"}>
              Step 1: Register
            </span>
            <span className={step === 2 ? "font-semibold text-blue-500" : "text-gray-500"}>
              Step 2: Verify
            </span>
          </div>
        </div>

        {/* Step 1: User Details */}
        {step === 1 ? (
          <UserDetailsForRegister onComplete={() => setStep(2)} onEmail={(email)=>setEmail(email)}/>
        ) : (
          <EmailVerification email={email} />
        )}

        {/* Login Option for Existing Users */}
        <div className="text-center mt-6">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
