import React, { useEffect, useState } from 'react'
import { addTwoStepVerification } from '../../../store/user/userController';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../../store/user/userSlice';
import { toast } from 'react-toastify';

function TwoStepVerification({isTwoStepAuth , isVerify , onVerifyRequest}) {

    const [isTwoStepEnabled, setIsTwoStepEnabled] = useState(isTwoStepAuth);
    const [isShowTwoStepAuth, setIsShowTwoStepAuth] = useState(isTwoStepAuth); 
    const [hasInteracted, setHasInteracted] = useState(false); 

    const { user, status, message } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsTwoStepEnabled(isTwoStepAuth);
        setIsShowTwoStepAuth(isTwoStepAuth);
      }, [isTwoStepAuth]);


      const toggleTwoStepAuth = () => {
        if (isVerify) {
          setIsTwoStepEnabled((prev) => !prev); // Toggle the state locally
          setHasInteracted(true)
        } else{
            onVerifyRequest()
        }
      };
    

        // Handle Two-Step Authentication Toggle
  const handleToggleTwoStepAuth = () => {
    
      dispatch(addTwoStepVerification({ isTwoStepAuth: isTwoStepEnabled }));

  };

  // Watch for changes to the Two-Step Auth state and trigger the function if necessary
  useEffect(() => {
    if(isVerify && hasInteracted){
        handleToggleTwoStepAuth();
    }
  }, [isTwoStepEnabled , isVerify , hasInteracted]);


  
  // Handle status updates
  useEffect(() => {
    if (status.twoStepAuth === 'success') {
      if (message) {
        toast.success(message);
      }
      dispatch(resetState());
    } else if (status.twoStepAuth === 'rejected') {
      toast.error(message); // Show error message
    }
  }, [message, status]);

  return (
    <div className="flex justify-between">
          <div className="font-medium text-gray-700">Two-Step Authentication:</div>
          <div className="flex items-center">
            <div className={`text-lg ${isTwoStepEnabled ? 'text-green-500' : 'text-red-500'}`}>
              {isTwoStepEnabled ? 'Enabled' : 'Disabled'}
            </div>
            <button
              onClick={toggleTwoStepAuth}
              className={`ml-4 px-4 py-2 rounded-full ${isTwoStepEnabled ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
              {isShowTwoStepAuth && user.isTwoStepAuth ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
  )
}

export default TwoStepVerification