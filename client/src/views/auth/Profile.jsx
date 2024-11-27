// ...other imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailVerifyReq from './components/EmailVerifyReq';
import EmailVerification from './components/EmailVerification';
import { addTwoStepVerification } from '../../store/user/userController';
import { resetState } from '../../store/user/userSlice';
import { toast } from 'react-toastify';
import TwoStepVerification from './components/TwoStepVerification';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, status, message , isAuthenticate } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    name,
    email,
    profile_pic,
    role,
    isVerify,
    isProfileComplete,
    isTwoStepAuth,
    createdAt,
    updatedAt,
  } = user;


  const [isEmailVerifyPopupVisible, setIsEmailVerifyPopupVisible] = useState(false);
  const [emailVerification, setEmailVerification] = useState(false);
  const navigate = useNavigate()

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  useEffect(()=>{
    if(!isAuthenticate){
        navigate('/login')
    }
  },[isAuthenticate])

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Profile</h1>

      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <div className="flex justify-center items-center w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 md:mb-0">
          <img src={profile_pic?.url} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <div className="text-xl font-semibold text-gray-800">{name}</div>
          <div className="text-gray-600">{email}</div>
          <div className="text-gray-500 text-sm mt-2">Role: {role}</div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <div className="font-medium text-gray-700">Profile Verified:</div>
          <div className={`text-lg ${isVerify ? 'text-green-500' : 'text-red-500'}`}>
            {isVerify ? 'Verified' : 'Not Verified'}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="font-medium text-gray-700">Profile Complete:</div>
          <div className={`text-lg ${isProfileComplete ? 'text-green-500' : 'text-red-500'}`}>
            {isProfileComplete ? 'Complete' : 'Incomplete'}
          </div>
        </div>

         {/* two step authentication options */}
        <TwoStepVerification isTwoStepAuth={isTwoStepAuth} isVerify={isVerify} onVerifyRequest={()=>setIsEmailVerifyPopupVisible(true)}/>

        <div className="flex justify-between">
          <div className="font-medium text-gray-700">Account Created:</div>
          <div className="text-gray-600">{formatDate(createdAt)}</div>
        </div>

        <div className="flex justify-between">
          <div className="font-medium text-gray-700">Last Updated:</div>
          <div className="text-gray-600">{formatDate(updatedAt)}</div>
        </div>
      </div>


      {/* Email Verification request Popup box */}
      {isEmailVerifyPopupVisible && (
        <div className="popup_container">
          <EmailVerifyReq
            onClose={() => setIsEmailVerifyPopupVisible(false)}
            email={email}
            onEmailVerificationPopupActive={() => setEmailVerification(true)}
          />
        </div>
      )}

      {/* Email verification section */}
      {emailVerification && (
        <div className="popup_container">
          <div className="rounded-md shadow-md bg-white p-5 max-w-[500px]">
            <EmailVerification email={email} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
