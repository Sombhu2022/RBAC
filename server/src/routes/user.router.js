import express from 'express'
import { addTwoStepVerification, changePassWithOtp, ChangePasswordWithOldPassword, changeProfilePic, getAllUsersWithPost , createUser, deleteUser, forgotPassword, getUser, logInUser, logOutUser, sendOtpForVerifyAccount, updateUser, VerifyOtpWithExpiry, updateUserRoleByAdmin } from '../controllers/user.controller.js';
import { authorizeRoles, isAuthenticate } from '../middlewares/authentication.js';


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
   
   .get('/all' , isAuthenticate , authorizeRoles('admin') , getAllUsersWithPost)
   .post('/update-role/:userId' , isAuthenticate , authorizeRoles('admin') , updateUserRoleByAdmin)
export const userRouter = router;