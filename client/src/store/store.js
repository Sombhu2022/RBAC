import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./user/userSlice";
import  blogSlice  from "./blog/blogSlice";
import  reportSlice  from "./report/reportSlice";



const store = configureStore({
    reducer:{
        user : userSlice ,
        blog: blogSlice,
        report : reportSlice
    }
})

export default store