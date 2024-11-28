# Role-Based Access Control (RBAC) System 🚀

## Table of Contents

- [Introduction](#introduction)  
- [Project Goals](#project-goals)  
- [Core Functionalities](#core-functionalities)  
- [Technologies Used](#technologies-used)  
- [Setup and Installation](#setup-and-installation)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Application Workflow](#application-workflow)  
- [Features Explained](#features-explained)  
  - [Authentication](#authentication)  
  - [Role Management](#role-management)  
  - [Blog Management](#blog-management)  
  - [Audit Logging](#audit-logging)  
- [Folder Structure](#folder-structure)  
- [API Documentation](#api-documentation)  
- [Future Enhancements](#future-enhancements)  
- [Contributing](#contributing)  
- [Contact](#contact)  

---

## 📘 Introduction

The **Role-Based Access Control (RBAC) System** is a web-based application designed to enforce secure access control by assigning roles and permissions to users. This system ensures that users can only perform actions that align with their roles, providing a secure and organized way to manage access to application features.

---

## 🎯 Project Goals

1. Implement a **secure role-based permission system**.  
2. Provide **granular access control** for multiple application modules.  
3. Enable **dynamic role and permission management** for administrators.  
4. Deliver a user-friendly interface with a focus on responsiveness and usability.  
5. Maintain scalability to accommodate new roles, features, and permissions as the application evolves.  

---

## ⚙️ Core Functionalities

### 1. **User Authentication and Authorization**  
   - Secure registration and login functionality using hashed passwords.  
   - JWT-based token authentication for user sessions.  
   - Role-based access to features and data.  

### 2. **Role Management**  
   - Create, update, and delete roles dynamically.  
   - Assign and manage permissions for each role.  

### 3. **Granular Access Control**  
   - Define specific permissions for roles (e.g., view, edit, delete).  
   - Restrict sensitive actions to authorized users only.  

### 4. **Blog Management**  
   - Users can write, edit, and delete blogs.  
   - Interactive reactions on blogs (e.g., emojis).  
   - Toggle reactions (add/remove).  

### 5. **Audit Logging**  
   - Tracks and records user actions for accountability and debugging.  

---

## 🛠️ Technologies Used

### **Frontend**
- **React**  
- **Redux**  
- **Tailwind CSS**  
- **React Toastify**  
- **React Icons**

### **Backend**
- **Node.js**  
- **Express.js**  
- **Mongoose**  

### **Database**
- **MongoDB**  

### **Additional Libraries and Tools**
- **JWT**  
- **Bcrypt.js**  
- **Axios**  
- **dotenv**  
- **ESLint and Prettier**  

---

## ⚡ Setup and Installation

### Backend Setup
1. Clone the repository and navigate to the server directory:  
   ```bash
   git clone https://github.com/Sombhu2022/RBAC-System.git
   cd RBAC-System/server
