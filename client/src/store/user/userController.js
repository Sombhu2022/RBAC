import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const regUser = createAsyncThunk(
    'user/regUser',
    async ({ name, password, email }, { rejectWithValue }) => {
        try {
            const {data} = await axios.post(
                `/api/v1/user`,
                { name, password, email },

                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log("show data", data);
            return data;
        } catch (error) {
            // If the error is from Axios, it will have a response property
            console.error('error', error)
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            // For other types of errors
            return rejectWithValue('An unexpected error occurred');
        }
    }
);



export const authenticateUser = createAsyncThunk(
    'user/authenticateUser',
    async (_ , { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `/api/v1/user`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true
                }
            );
            console.log(data);

            return data;
        } catch (error) {
            console.error('error', error)
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const fetchAllUserWithPost = createAsyncThunk(
    'user/fetchAllUserWithPost',
    async (_ , { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `/api/v1/user/all`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true
                }
            );
            console.log(data);

            return data;
        } catch (error) {
            console.error('error', error)
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);


export const loginUser  = createAsyncThunk(
    'user/loginUser',
    async ({ email , password} , { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `/api/v1/user/login`, { email , password} ,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true
                }
            );
            console.log(data);

            return data;
        } catch (error) {
            console.error('error', error)
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);


export const logoutUser  = createAsyncThunk(
    'user/logoutUser',
    async ( _ , { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `/api/v1/user/logout`, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true
                }
            );
            console.log(data);

            return data;
        } catch (error) {
            console.error('error', error)
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);



export const sendOtpForProfileValidation  = createAsyncThunk(
    'user/sendOtpForProfileValidation',
    async ( {email} , { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `/api/v1/user/send-otp`, {email},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true
                }
            );
            console.log(data);

            return data;
        } catch (error) {
            console.error('error', error)
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);


export const verifyOtpForProfileValidation  = createAsyncThunk(
    'user/verifyOtpForProfileValidation',
    async ( {otp , email} , { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `/api/v1/user/verify-otp`, {otp , email},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true
                }
            );
            console.log(data);

            return data;
        } catch (error) {
            console.error('error', error)
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);


export const addTwoStepVerification  = createAsyncThunk(
    'user/addTwoStepVerification',
    async ( {isTwoStepAuth} , { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `/api/v1/user/twostep-verify`, {isTwoStepAuth},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true
                }
            );
            console.log(data);

            return data;
        } catch (error) {
            console.error('error', error)
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);


// update user role , only admin can controll 
export const updateUserRole  = createAsyncThunk(
    'user/updateUserRole',
    async ( {userId , newRole} , { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `/api/v1/user/update-role/${userId}`, {newRole},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true
                }
            );
            console.log(data);

            return data;
        } catch (error) {
            console.error('error', error)
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);


