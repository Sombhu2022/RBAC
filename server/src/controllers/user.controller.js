

import { sendCookie } from "../utils/sendCookie.js";
import { sendEmail } from "../utils/sendMail.js";
import { genarate6DigitOtp } from "../utils/OtpGenarate.js";
import { timeExpire } from "../utils/timeExpire.js";
import { Users } from '../models/user.model.js';
import { fileDestroy, fileUploader } from '../utils/fileUpload.js';

// Create a new user
export const createUser = async (req, res) => {
    console.log(req.body);
    
    try {
        const { name, password, email } = req.body;
        console.log(name, password, email );
        

        if (!name || !password || !email) {
            return res.status(400).json({ message: "Missing required fields!", success: false });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters!", success: false });
        }
       // check user exist or not ...
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists, try another!", success: false });
        }
       // create user 
        const user = await Users.create({ name, email, password });
        // send registration mail
        sendEmail(
            user.email,
            `Welcome ${user.name}`,
            "Thank you for choosing Vraman Sathi Pvt. Ltd. for your transportation needs."
        );

        // send 6 digit otp for email verification
        const otp = genarate6DigitOtp();
        user.otp = otp;
        user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        await user.save();
        await sendEmail(user.email, "Verify Account - OTP", otp);

        sendCookie(user, res, "User created successfully", 200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again!", success: false, error });
    }
};

// Send OTP for account verification
export const sendOtpForVerifyAccount = async (req, res) => {
    try {
        
        const { email } = req.body;
        const user = await Users.findOne({email});

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

        return  sendCookie(user, res, "OTP verify success !", 200);
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


export const getAllUsersWithPost = async(req , res)=>{
    try {
        // Fetch users along with their posts
        const usersWithPosts = await Users.aggregate([
          {
            $lookup: {
              from: "blogs", // Collection name for posts
              localField: "_id",
              foreignField: "user",
              as: "posts",
            },
          },
          {
            $project: {
              name: 1,
              email: 1,
              role: 1,
              posts: 1,
              createdAt: 1 ,
              updatedAt:1,
              isVerify:1,
              totalPosts: { $size: "$posts" }, // Calculate total number of posts
            },
          },
        ]);
    
       return  res.status(200).json({ message:'all user fetched' , data:usersWithPosts});

      } catch (error) {
        console.error("Error fetching users and posts:", error);
        res.status(500).json({ message: "Server error." });
      }
}

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

        if(user.isTwoStepAuth){

             // send 6 digit otp for email verification
            const otp = genarate6DigitOtp();
            user.otp = otp;
            user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
            await user.save();
            await sendEmail(user.email, "Two Step Verification", otp);

            return res.status(200).json({
                message :"Verification code send in your email" ,
                data:null
            })
        }

       return  sendCookie(user, res, "User login successfully", 200);
        
    } catch (error) {
        res.status(500).json({ message: "Server error.", error });
    }
};


// Update User Role by Admin
export const updateUserRoleByAdmin = async (req, res) => {
    try {
      // 2. Get user ID and the new role from request
      const { newRole } = req.body;
      const { userId } = req.params;
  
      // 3. Validate the new role
      const validRoles = ['user', 'admin', 'controller'];  // Add any other roles if required
      if (!validRoles.includes(newRole)) {
        return res.status(400).json({ message: 'Invalid role.' });
      }
  
      // 4. Find the user by ID
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // 5. Check if the user is already an admin (or whatever condition you want)
      if (user.role === 'admin' && newRole === 'admin') {
        return res.status(400).json({ message: 'User is already an admin.' });
      }
  
      // 6. Update the user's role
      user.role = newRole;
      await user.save();
  
      // 7. Send success response
      return res.status(200).json({ message: `User role updated to ${newRole} successfully.` });
  
    } catch (error) {
      console.error('Error updating user role:', error);
      return res.status(500).json({ message: 'Server error, try again later.' });
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


// add two step verification 

export const addTwoStepVerification = async (req, res) => {
    try {
        const { id } = req.user; // Extract user ID from authenticated user
        const { isTwoStepAuth } = req.body; // Get the desired Two-Step Auth status from the request body

        // Check if `isTwoStepAuth` is provided
        if (isTwoStepAuth === undefined) {
            return res.status(400).json({
                message: "Required field 'isTwoStepAuth' is missing!",
            });
        }

        // Fetch the user from the database using their ID
        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found!",
            });
        }

        // check profile is verify or not 
        if(!user.isVerify){
            return res.status(404).json({
                message: "Frist Verify Your Account !",
            });
        }

        // Update the user's Two-Step Authentication status
        user.isTwoStepAuth = isTwoStepAuth;

        // Save the updated user to the database
        await user.save();

        return res.status(200).json({
            message: `Two-Step Authentication has been ${isTwoStepAuth ? "enabled" : "disabled"} successfully!`,
            data:user
        });
    } catch (error) {
        console.error("Error enabling Two-Step Verification:", error);

        return res.status(500).json({
            message: "Internal server error. Please try again later.",
            error: error.message,
        });
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
