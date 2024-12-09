import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const createBlog = createAsyncThunk(
    'blog/createBlog',
    async ( formData , { rejectWithValue }) => {
        try {
            const {data} = await axios.post(
                `/api/v1/blog`,
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
                `/api/v1/blog`,

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


export const fetchBlogByBlogId = createAsyncThunk(
    'blog/fetchBlogByBlogId',
    async ({blogId}, { rejectWithValue }) => {
        try {
            const {data} = await axios.get(
                `/api/v1/blog/${blogId}`,

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


export const fetchAllBlogsOfEachUser = createAsyncThunk(
    'blog/fetchAllBlogsOfEachUser',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await axios.get(
                `/api/v1/blog/myblog/all`,

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

export const deleteBlog  = createAsyncThunk(
    'blog/deleteBlog',
    async ({blogId}, { rejectWithValue }) => {
        try {
            const {data} = await axios.delete(
                `/api/v1/blog/${blogId}`,

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

export const updateBlog  = createAsyncThunk(
    'blog/updateBlog',
    async ({formData , blogId }, { rejectWithValue }) => {
        try {
            const {data} = await axios.patch(
                `/api/v1/blog/${blogId}`,
                 formData,
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


export const blockABlogPost  = createAsyncThunk(
    'blog/blockABlogPost',
    async ({blogId , isBlock }, { rejectWithValue }) => {
        try {
            const {data} = await axios.patch(
                `/api/v1/blog/block-post/${blogId}`,{ isBlock},
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


export const addNewReaction  = createAsyncThunk(
    'blog/reactToBlock',
    async ({blogId , isReaction  }, { rejectWithValue }) => {
        try {
            const {data} = await axios.patch(
                `/api/v1/blog/reaction/${blogId}`,{ isReaction },
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
