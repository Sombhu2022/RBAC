
// import { sendCookie } from "../utils/sendCookie.js";
// import { sendEmail } from "../utils/sendMail.js";
// import { genarate6DigitOtp } from "../utils/OtpGenarate.js";
// import { timeExpire } from "../utils/timeExpire.js";
// import { Users } from '../models/user.model.js';
// import { fileDestroy, fileUploader } from '../utils/fileUpload.js';


// export const createUser = async (req, res) => {

//     try {
//         const { name, password, email, role } = req.body
//         console.log(req.body);

//         if (!name || !password || !email) {
//             return res.status(400).json({
//                 message: "something error , please try again !",
//                 success: false
//             })
//         }
//         if(password.length < 8){
//             return res.status(400).json({
//                 message: "Password must be 8 character or more !",
//                 success: false
//             })
//         }

//         let user = await Users.findOne({ email })
//         // console.log("user=>", user);
//         if (user) {
//             console.info("user exist");
//             return res.status(400).json({ message: "email alrady exist , please try with another email !" , success:false })
//         }

//         user = await Users.create({ name, email, password, role })
//         sendCookie(user, res, "user created successfull", 200)
//         sendEmail(user.email, `wellcome ${user.name}`, "Thank you for choosing <strong>Vraman Sathi Pvt. Ltd.</strong> as your transportation management platform. We're dedicated to providing you with the best centralized transportation solutions to make your journey smooth and efficient.")

//     } catch (error) {
//         console.log(error);
        
//         return res.status(400).json({
//             message: "somthing error , please try again !",
//             success: false,
//             error
//         })

//     }
// }


// export const sendOtpForVerifyAccount = async (req, res) => {
//     try {
//         // Authenticate user and retrieve email
//         const { id } = req.user;
//         const { email } = req.body 
//         const user = await Users.findById(id);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not authenticated!",
//                 success: false,
//             });
//         }

//         // Generate OTP
//         const otp = genarate6DigitOtp();
//         const otpExpiry = Date.now() + 5 * 60 * 1000; // Set OTP expiry for 10 minutes

//         // Send OTP email
//         await sendEmail(email, "Verify Account - OTP", otp);

//         // Save OTP and expiry in user record
//         user.otp = otp;
//         user.otpExpiary = otpExpiry;
//         await user.save();

//         return res.status(200).json({
//             message: "OTP sent successfully to verify your account.",
//             success: true,
//         });
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         return res.status(500).json({
//             message: "Something went wrong, please try again!",
//             success: false,
//         });
//     }
// };



// export const VerifyOtpWithExpiry = async(req , res)=>{
//     try {
       
//         const { otp } = req.body 

//         let user = await Users.findOne({otp: otp , otpExpiary:{$gt:Date.now()}})

//         user.otp = null
//         user.otpExpiary = null 

//         if(!user){
//             await user.save()
//             return res.status(400).json({message:'Invalid OTP ! , please verify request again'})
//         } else{
//             user.isVerify = true
//         }
      
//         await user.save()
    
//         return res.status(200).json({
//             message:"otp verify successfully",
//             success:true ,
//             user
//         })
//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({
//             message:"something error , please try again !",
//             success:false
//         })
//     }
// }



// export const getUser = async (req, res) => {
//     try {
//         const { id } = req.user;
//         const user = await Users.findById({ _id: id });
//         res.status(200).json({
//             message: "user fetched",
//             data:user,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "somthing error",
//             error,
//         });
//     }
// };


// export const changeProfilePic = async(req , res)=>{
//     try {
//         // file path 
//         const { file } = req.body
//         const { id } = req.user 

//         // file check 
//         if(!file){
//             return res.status(400).json({
//                 message:"file is required !" ,
//                 success:false
//             })
//         }

//         // user fetching 
//         let user = await Users.findById(id)

//         if(!user){
//             return res.status(400).json({message:'user not authenticate !'})
//         }

//         // delete previous file 
//         const file_id = user.profile_pic?.public_id
//         const isDistroy = await fileDestroy(file_id)

//         if(!isDistroy && file_id){
//             return res.status(400).json({
//                 message:"previous file not deleted ! , please try again ",
//                 success:false
//             })
//         }

//         // new file upload 
//         const { url , public_id , error } = await fileUploader(file)

//         if(error){
//             return res.status(400).json({
//                 message:"file not upload !" ,
//                 success:false
//             })
//         }

//         user.profile_pic.url = url 
//         user.profile_pic.public_id = public_id

//         await user.save()

//         return res.status(200).json({
//             message:"profile pic update success !",
//             success:true ,
//             data:user
//         })

//     } catch (error) {
//         res.status(400).json({
//             message: "somthing error",
//             error,
//         });
//     }
// } 


// export const logInUser = async (req, res) => {

//     try {
//         const { email, password } = req.body;
//         const user = await Users.findOne({
//             email
//         })
//         .select('+password')

//         if (!user) return res.status(400).json({
//             message: "email or password not match"
//         })
//         console.log(user);
//         console.log(password);
//         const isMatch = await user.comparePassword(password)
//         console.log(isMatch);

//         if (!isMatch) return res.status(400).json({
//             message: "email or password not match"
//         })
//         sendCookie(user, res, " login successfull", 200)

//     } catch (error) {
//         res.status(400).json({
//             message: "somthing error , please try again !",
//             error
//         })
//     }
// }

// export const logOutUser = (req, res) => {
//     try {
//         res
//             .status(200)
//             .cookie("token", "" , {
//                   expires: new Date(Date.now()),
//                   httpOnly: true,
//             })
//             .json({
//                 success: true,
//                 message: "Logout successfull",
//             });

//     } catch (error) {
//         res.json({
//             success: false,
//             message: error,
//         });
//     }
// }

// export const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params
//         await Users.findByIdAndDelete({ id })

//         res
//             .status(200)
//             .cookie("token", "", {
//                 expires: new Date(Date.now()),
//                 httpOnly: true,
//             })
//             .json({
//                 success: true,
//                 message: "user deleted",
//             });

//     } catch (error) {
//         res.status(400).json({
//             message: 'user not delete',
//             success: false,
//             error
//         })
//     }
// }

// export const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params
//         const user = Users.findByIdAndUpdate({ id }, req.body, { new: true })
//         res.status(200).json({
//             message: "update user",
//             success: true,
//             user
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: 'user not update',
//             success: false,
//             error
//         })

//     }
// }

// export const forgotPassword = async (req, res) => {
//     const { email } = req.body
//     console.log(req.body);
//     try {
//         let user = await Users.findOne({ email })
//         console.log(user);
//         if (!user) return res.status(400).json({
//             success: false,
//             message: 'user not found'
//         });
//         const otp = genarate6DigitOtp()
//         console.log(otp);
//         sendEmail(email, 'OTP for forgot password', `this is your Otp ${otp} , not shear anywhere`)

//         user.otp = otp;
//         user.expireAt = Date.now() + 5 * 60 * 1000;
//         await user.save({ validateBeforeSave: false })

//         res.status(200).json({
//             user,
//             message: 'otp send successfully'
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(400).json({

//             message: "somthing error"
//         })
//     }
// }




// export const changePassWithOtp = async (req, res) => {
//     try {
//         const { otp, password } = req.body

//         console.log(req.body, typeof (otp));
//         const user = await Users.findOne({ otp }).select('+password')
//         // console.log(user);
//         const isOtpExpire = timeExpire(user.expireAt);
//         if (isOtpExpire) {
//             user.otp = null;
//             user.otpExpiary = null;
//             await user.save({ validateBeforeSave: false })
//             return res.status(400).json({
//                 message: "otp is expired"
//             })
//         }


//         console.log(user);
//         if (!user) return res.status(400).json({
//             message: 'otp not corrct'
//         });

//         user.password = password;
//         user.otp = null
//         await user.save({ validateBeforeSave: false })

//         res.status(200).json({
//             user,
//             message: 'password changed'
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: "error"
//         })
//     }
// }



// export const ChangePasswordWithOldPassword = async (req, res) => {

//     const { id } = req.user
//     const { oldPassword, newPassword } = req.body
//     console.log("log password", oldPassword);
//     try {
//         const user = await Users.findById(id).select("+password")
//         const isMatch = await user.comparePassword(oldPassword)

//         if (!isMatch) return res.status(400).json({
//             message: " password not match"
//         })

//         user.password = newPassword;
//         await user.save({ validateBeforeSave: false })

//         // res.status(200).json({ success:true , message:"password change successfully", user })
//         sendCookie(user, res, " password chang successfully", 200)

//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ success: false, message: "password not change", error })

//     }

// }

import { sendCookie } from "../utils/sendCookie.js";
import { sendEmail } from "../utils/sendMail.js";
import { genarate6DigitOtp } from "../utils/OtpGenarate.js";
import { timeExpire } from "../utils/timeExpire.js";
import { Users } from '../models/user.model.js';
import { fileDestroy, fileUploader } from '../utils/fileUpload.js';

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, password, email, role } = req.body;

        if (!name || !password || !email) {
            return res.status(400).json({ message: "Missing required fields!", success: false });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters!", success: false });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists, try another!", success: false });
        }

        const user = await Users.create({ name, email, password, role });
        sendCookie(user, res, "User created successfully", 200);
        sendEmail(
            user.email,
            `Welcome ${user.name}`,
            "Thank you for choosing Vraman Sathi Pvt. Ltd. for your transportation needs."
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again!", success: false, error });
    }
};

// Send OTP for account verification
export const sendOtpForVerifyAccount = async (req, res) => {
    try {
        const { id } = req.user;
        const { email } = req.body;
        const user = await Users.findById(id);

        if (!user) {
            return res.status(400).json({ message: "User not authenticated!", success: false });
        }

        const otp = genarate6DigitOtp();
        user.otp = otp;
        user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        await user.save();
        await sendEmail(email, "Verify Account - OTP", otp);

        res.status(200).json({ message: "OTP sent successfully.", success: true });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Server error, please try again!", success: false });
    }
};

// Verify OTP and activate account
export const VerifyOtpWithExpiry = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await Users.findOne({ otp, otpExpiary: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid OTP!", success: false });
        }

        user.otp = null;
        user.otpExpiary = null;
        user.isVerify = true;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully.", success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again!", success: false });
    }
};

// Fetch user details
export const getUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await Users.findById(id);
        res.status(200).json({ message: "User fetched successfully.", data: user });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

// Update profile picture
export const changeProfilePic = async (req, res) => {
    try {
        const { file } = req.body;
        const { id } = req.user;

        if (!file) {
            return res.status(400).json({ message: "File is required!", success: false });
        }

        const user = await Users.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User not authenticated!", success: false });
        }

        if (user.profile_pic?.public_id) {
            const isDestroyed = await fileDestroy(user.profile_pic.public_id);
            if (!isDestroyed) {
                return res.status(400).json({ message: "Failed to delete previous file.", success: false });
            }
        }

        const { url, public_id, error } = await fileUploader(file);
        if (error) {
            return res.status(400).json({ message: "File upload failed!", success: false });
        }

        user.profile_pic = { url, public_id };
        await user.save();

        res.status(200).json({ message: "Profile picture updated successfully.", success: true, data: user });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

// Log in user
export const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        sendCookie(user, res, "Login successful", 200);
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

// Log out user
export const logOutUser = (req, res) => {
    try {
        res.status(200).cookie("token", "", { expires: new Date(), httpOnly: true }).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

// Delete user account
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Users.findByIdAndDelete(id);

        res.status(200).cookie("token", "", { expires: new Date(), httpOnly: true }).json({
            success: true,
            message: "User deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user.", success: false, error });
    }
};

// Update user details
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ message: "User updated successfully.", success: true, user });
    } catch (error) {
        res.status(500).json({ message: "Failed to update user.", success: false, error });
    }
};

// Forgot password - Send OTP
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        const otp = genarate6DigitOtp();
        await sendEmail(email, "OTP for Password Reset", `Your OTP is ${otp}. Do not share it with anyone.`);
        user.otp = otp;
        user.expireAt = Date.now() + 5 * 60 * 1000;
        await user.save({ validateBeforeSave: false });

        res.status(200).json({ message: "OTP sent successfully.", user });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

// Reset password using OTP
export const changePassWithOtp = async (req, res) => {
    try {
        const { otp, password } = req.body;
        const user = await Users.findOne({ otp }).select("+password");

        if (!user || timeExpire(user.expireAt)) {
            return res.status(400).json({ message: "Invalid or expired OTP!" });
        }

        user.password = password;
        user.otp = null;
        await user.save({ validateBeforeSave: false });

        res.status(200).json({ message: "Password reset successful.", user });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};

// Change password using old password
export const ChangePasswordWithOldPassword = async (req, res) => {
    try {
        const { id } = req.user;
        const { oldPassword, newPassword } = req.body;
        const user = await Users.findById(id).select("+password");

        if (!user || !(await user.comparePassword(oldPassword))) {
            return res.status(400).json({ message: "Incorrect old password!" });
        }

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });
        sendCookie(user, res, "Password changed successfully", 200);
    } catch (error) {
        res.status(500).json({ message: "Failed to change password.", error });
    }
};
