import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../App";
import axios from "axios";

export const createBlog = createAsyncThunk(
    'blog/createBlog',
    async ( formData , { rejectWithValue }) => {
        try {
            const {data} = await axios.post(
                `${baseUrl}/blog`,
                 formData ,

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

export const fetchAllBlogs = createAsyncThunk(
    'blog/fetchAllBlogs',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await axios.get(
                `${baseUrl}/blog`,

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
