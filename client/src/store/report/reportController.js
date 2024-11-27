import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../App";

// add new Report 
export const addNewReport  = createAsyncThunk(
    'report/addNewReport',
    async ( {reportType, description, reportedOn} , { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${baseUrl}/report`, {reportType, description, reportedOn},
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

// fetch all Report 
export const fetchAllReport   = createAsyncThunk(
    'report/fetchAllReport',
    async ( _ , { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `${baseUrl}/report`,
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


