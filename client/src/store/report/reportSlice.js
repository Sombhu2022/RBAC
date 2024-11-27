import { createSlice } from "@reduxjs/toolkit"
import { addNewReport, fetchAllReport } from "./reportController"

const initialState = {
    reports : [],
    report : {},
    myReports:[] ,
    status:{
        addNewReport : '' ,
        fetchAllReport: ''
    },
    loading :{
        addNewReportLoading : false ,
        fetchAllReportLoading : false
    },
    message : '',
    error: null
}

export const reportSlice = createSlice({
    name:'report' ,
    initialState ,
    reducers:{

        resetReportState : (state , action)=>{
            state.error = null
            state.message = ''
            state.status.addNewReport = ''
        }
    } ,
    extraReducers: (builder)=>{

        builder

          // add new report 
             .addCase(addNewReport.pending , (state , action)=>{
                state.status.addNewReport = 'pending'
                state.loading.addNewReportLoading = true
             })
             .addCase(addNewReport.fulfilled , (state , action)=>{
                const {data , message } = action
                state.status.addNewReport = 'success'
                state.loading.addNewReportLoading = false
                state.report = data
                state.message = message
             })
             .addCase(addNewReport.rejected , (state , action)=>{
                const { message , error } = action
                state.status.addNewReport = 'rejected'
                state.loading.addNewReportLoading = false
                state.message = message
                state.error =error
             })


          // fetch All Report 
             .addCase(fetchAllReport.pending , (state , action)=>{
                state.status.fetchAllReport = 'pending'
                state.loading.fetchAllReportLoading = true
             })
             .addCase(fetchAllReport.fulfilled , (state , action)=>{
                const {data , message } = action
                state.status.fetchAllReport = 'success'
                state.loading.fetchAllReportLoading = false
                state.reports = data
                state.message = message
             })
             .addCase(fetchAllReport.rejected , (state , action)=>{
                const { message , error } = action
                state.status.fetchAllReport = 'rejected'
                state.loading.fetchAllReportLoading = false
                state.message = message
                state.error =error
             })


    }
}) 

export const { resetReportState } = reportSlice.actions
export default reportSlice.reducer