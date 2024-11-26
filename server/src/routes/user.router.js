import express from 'express'
import { isAuthenticate } from '../middlewares/Authentication.js';
import { addTwoStepVerification, changePassWithOtp, ChangePasswordWithOldPassword, changeProfilePic, createUser, deleteUser, forgotPassword, getUser, logInUser, logOutUser, sendOtpForVerifyAccount, updateUser, VerifyOtpWithExpiry } from '../controllers/user.controller.js';


const router = express.Router();

router
   .get('/' , isAuthenticate , getUser)
   .post('/' , createUser)
   .post('/changeImage' , isAuthenticate , changeProfilePic )
   .patch('/:id',isAuthenticate , updateUser)
   .delete('/:id', isAuthenticate ,deleteUser)

   .post('/login' , logInUser )
   .get('/logout' ,isAuthenticate, logOutUser)

   .post('/send-otp'  ,  sendOtpForVerifyAccount)
   .post('/verify-otp' , VerifyOtpWithExpiry)

   .post('/twostep-verify' , isAuthenticate , addTwoStepVerification)

   .post('/forgotRequest' , forgotPassword)
   .post('/forgotPass',changePassWithOtp )
   .post('/changePassword' ,isAuthenticate, ChangePasswordWithOldPassword )

export const userRouter = router;