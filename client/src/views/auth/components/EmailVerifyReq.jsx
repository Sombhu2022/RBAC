import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendOtpForProfileValidation } from '../../../store/user/userController';
import { resetState } from '../../../store/user/userSlice';

function EmailVerifyReq({onClose , email , onEmailVerificationPopupActive}) {
    const dispatch = useDispatch()
   const { user, isAuthenticate, loading, message, status } = useSelector((state) => state.user);
    
    // Handle Email Verification - you can add an API call here to verify the email
    const handleEmailVerification = () => {
       dispatch(sendOtpForProfileValidation({email}))
  };

  useEffect(()=>{
    if (status.sendOtp === "success") {
        if (message) {
          toast.success(message);
        }
        onEmailVerificationPopupActive()
        dispatch(resetState());
      } else if (status.sendOtp === "rejected") {
        toast.error(message); // Show error message
      }
  
  }, [loading.sendOtpLoading , status , message])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
             <h2 className="text-xl font-semibold mb-4">Please Verify Your Email</h2>
             <p className="mb-4">To enable two-step verification, please verify your email address first.</p>
             <div className="flex justify-center space-x-4">
               <button
                 onClick={handleEmailVerification}
                 className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
               >
                 Verify Email
               </button>
               <button
                 onClick={()=>onClose()}
                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
               >
                 Cancel
               </button>
             </div>
           </div>
  )
}

export default EmailVerifyReq