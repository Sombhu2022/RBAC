import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// add new Report 
export const addNewReport  = createAsyncThunk(
    'report/addNewReport',
    async ( {reportType, description, reportedOn} , { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `/api/v1/report`, {reportType, description, reportedOn},
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
                `/api/v1/report`,
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

// update report Status 
export const updateReportStatus   = createAsyncThunk(
    'report/updateReportStatus',
    async ({  status , resolutionNotes , reportId } , { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(
                `/api/v1/report/status/${reportId}`,{  status , resolutionNotes },
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


