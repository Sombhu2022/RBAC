import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./user/userSlice";
import  blogSlice  from "./blog/blogSlice";



const store = configureStore({
    reducer:{
        user : userSlice ,
        blog: blogSlice,
    }
})

export default store