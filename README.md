# CodeCanvas 🌐👨‍💻

**Empowering Developers Through Collaboration**

## Table of Contents

- [Introduction](#introduction)
- [Goals](#goals)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Application Workflow](#application-workflow)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Contact](#contact)

## 📘 Introduction

**CodeCanvas** is a cutting-edge web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It aims to create a vibrant community for developers and programmers to share trending technologies, code snippets, and technical insights. With its robust features like role-based access control, rate limiting, and two-factor authentication, CodeCanvas ensures a secure and engaging experience for users.

## 🎯 Goals

1. Foster a collaborative and engaging community for developers.
2. Enable users to share and discover trending technologies, code snippets, and technical content.
3. Ensure a **secure, scalable, and user-friendly platform** with features like two-factor authentication and role-based dashboards.
4. Provide tools for **content moderation** through a post-reporting system.

## ⚙️ Features

### 1. Role-Based Access Control (RBAC)
- Assign roles (Admin, Controller , User) with specific permissions.
- Manage access to features and dashboards based on roles.

### 2. Authentication and Security
- Secure user authentication with JWT (JSON Web Tokens).
- Two-factor authentication for enhanced security.
- Rate limiting to prevent abuse and ensure application stability.

### 3. Post Sharing and Reactions
- Share trending technologies, code snippets, and technical content.
- Engage with posts using interactive reactions .

### 4. Post Reporting System
- Report unusual or inappropriate posts.
- Admin and Controllers can review and take necessary actions.

### 5. Custom Dashboards
- Role-specific dashboards to enhance user experience.
- Admin: Manage users, roles, and reported posts.
- Controller: Controller reported posts and ensure content quality.
- User: Post, react, and explore shared content.

### 6. Media Handling
- Cloudinary integration for seamless media uploads and management.
- Efficient handling of images and videos in posts.

## 🛠️ Technologies Used

### Frontend
- **React.js**
- **Redux Toolkit**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express.js**
- **Mongoose**

### Database
- **MongoDB**

### Additional Libraries and Tools
- **JWT** for secure authentication
- **Bcrypt.js** for password hashing
- **Cloudinary** for media uploads
- **Rate Limiter** for request throttling
- **ARCJET** for Rate Limiting 

## ⚡ Setup and Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Sombhu2022/RBAC.git CodeCanvas
   cd CodeCanvas/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in a .env file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ARCJET_ENV = development
   ARCJET_KEY = your api key
   MAIL_HOST=
   MAIL_PORT=
   MAIL_NAME= 
   MAIL_PASS=
   MAIL_SERVICE =
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```


## API Documentation

Base URL: `/api/v1`

### User Management

Base URL: `/api/v1/user`

| Method | Endpoint | Description | Authentication | Authorization |
|--------|----------|-------------|----------------|---------------|
| GET | / | Get user profile | Required | - |
| POST | / | Create a new user | - | - |
| POST | /changeImage | Change user profile picture | Required | - |
| PATCH | /:id | Update user profile | Required | - |
| DELETE | /:id | Delete user account | Required | - |

### Authentication

| Method | Endpoint | Description | Authentication | Authorization |
|--------|----------|-------------|----------------|---------------|
| POST | /login | User login | - | - |
| GET | /logout | User logout | Required | - |
| POST | /send-otp | Send OTP for account verification | - | - |
| POST | /verify-otp | Verify OTP | - | - |
| POST | /twostep-verify | Add two-step verification | Required | - |
| POST | /forgotRequest | Request password reset | - | - |
| POST | /forgotPass | Change password with OTP | - | - |
| POST | /changePassword | Change password (old password required) | Required | - |

### Admin Operations

| Method | Endpoint | Description | Authentication | Authorization |
|--------|----------|-------------|----------------|---------------|
| GET | /all | Get all users with their posts | Required | Admin |
| POST | /update-role/:userId | Update user role | Required | Admin |

### Endpoint Details

1. **GET /** 
   - Description: Retrieves the profile of the authenticated user.
   - Authentication: Required
   - Controller: `getUser`

2. **POST /**
   - Description: Creates a new user account.
   - Authentication: Not required
   - Controller: `createUser`

3. **POST /changeImage**
   - Description: Updates the profile picture of the authenticated user.
   - Authentication: Required
   - Controller: `changeProfilePic`

4. **PATCH /:id**
   - Description: Updates the profile of the authenticated user.
   - Authentication: Required
   - Controller: `updateUser`

5. **DELETE /:id**
   - Description: Deletes the account of the authenticated user.
   - Authentication: Required
   - Controller: `deleteUser`

6. **POST /login**
   - Description: Authenticates a user and creates a session.
   - Authentication: Not required
   - Controller: `logInUser`

7. **GET /logout**
   - Description: Ends the current user session.
   - Authentication: Required
   - Controller: `logOutUser`

8. **POST /send-otp**
   - Description: Sends a one-time password for account verification.
   - Authentication: Not required
   - Controller: `sendOtpForVerifyAccount`

9. **POST /verify-otp**
   - Description: Verifies the OTP sent for account verification.
   - Authentication: Not required
   - Controller: `VerifyOtpWithExpiry`

10. **POST /twostep-verify**
    - Description: Adds two-factor authentication to the user's account.
    - Authentication: Required
    - Controller: `addTwoStepVerification`

11. **POST /forgotRequest**
    - Description: Initiates the password reset process.
    - Authentication: Not required
    - Controller: `forgotPassword`

12. **POST /forgotPass**
    - Description: Resets the password using an OTP.
    - Authentication: Not required
    - Controller: `changePassWithOtp`

13. **POST /changePassword**
    - Description: Changes the password for an authenticated user (requires old password).
    - Authentication: Required
    - Controller: `ChangePasswordWithOldPassword`

14. **GET /all**
    - Description: Retrieves all users and their posts (admin only).
    - Authentication: Required
    - Authorization: Admin role
    - Controller: `getAllUsersWithPost`

15. **POST /update-role/:userId**
    - Description: Updates the role of a specified user (admin only).
    - Authentication: Required
    - Authorization: Admin role
    - Controller: `updateUserRoleByAdmin`

Note: Endpoints marked with "Required" authentication use the `isAuthenticate` middleware. Admin operations use both `isAuthenticate` and `authorizeRoles('admin')` middlewares.


### Blog Management

Base URL: `/api/v1/blog`

| Method | Endpoint | Description | Authentication | Authorization |
|--------|----------|-------------|----------------|---------------|
| POST | / | Add a new blog post | Required | - |
| GET | / | Fetch all blog posts | - | - |
| GET | /:blogId | Fetch a specific blog post | - | - |
| GET | /myblog/all | Fetch all blogs of the authenticated user | Required | - |
| DELETE | /:blogId | Delete a blog post | Required | - |
| PATCH | /:blogId | Update a blog post | Required | - |
| PATCH | /reaction/:blogId | React to a blog post | Required | - |
| PATCH | /block-post/:blogId | Block a blog post | Required | Admin or Controller |

### Report Management

Base URL: `/api/v1/report`

| Method | Endpoint | Description | Authentication | Authorization |
|--------|----------|-------------|----------------|---------------|
| POST | / | Add a new report | Required | - |
| GET | / | Fetch all reports | Required | Admin or Controller |
| PATCH | /status/:reportId | Update report status | Required | Admin or Controller |

### Blog Endpoint Details

1. **POST /** - Creates a new blog post for the authenticated user.
2. **GET /** - Retrieves all blog posts.
3. **GET /:blogId** - Retrieves a specific blog post by its ID.
4. **GET /myblog/all** - Retrieves all blog posts created by the authenticated user.
5. **DELETE /:blogId** - Deletes a specific blog post (user must be the author).
6. **PATCH /:blogId** - Updates a specific blog post (user must be the author).
7. **PATCH /reaction/:blogId** - Allows a user to react to a blog post.
8. **PATCH /block-post/:blogId** - Allows an admin or controller to block a blog post.

### Report Endpoint Details

1. **POST /** - Creates a new report (e.g., for inappropriate content).
2. **GET /** - Retrieves all reports (admin or controller only).
3. **PATCH /status/:reportId** - Updates the status of a specific report (admin or controller only).

Note: Endpoints marked with "Required" authentication use the `isAuthenticate` middleware. Some operations use both `isAuthenticate` and `authorizeRoles('admin', 'controller')` middlewares for additional authorization.

## 🔄 Application Workflow

1. **User Registration and Login:**
   - Users sign up with secure credentials and two-factor authentication.

2. **Post Creation:**
   - Users share content, including images uploaded via Cloudinary.

3. **Community Interaction:**
   - Users react to posts or report inappropriate content.

4. **Content Moderation:**
   - Admins and controller manage reported posts through their respective dashboards.

## 🌟 Future Enhancements

- Real-Time Notifications
- Comment in Post 
- AI-Powered Post Moderation
- Mobile App



## 📧 Contact

- **Name:** Sombhu Das
- **GitHub:** [Sombhu2022](https://github.com/Sombhu2022)
- **Email:** sombhudas93@gmail.com


