import { createSlice } from "@reduxjs/toolkit"
import { addNewReport, fetchAllReport, updateReportStatus } from "./reportController"

const initialState = {
   reports: [],
   report: {},
   myReports: [],
   status: {
      addNewReport: '',
      fetchAllReport: '',
      updateReportStatus: ''
   },
   loading: {
      addNewReportLoading: false,
      fetchAllReportLoading: false,
      updateReportStatusLoading: false
   },
   message: '',
   error: null
}

export const reportSlice = createSlice({
   name: 'report',
   initialState,
   reducers: {

      resetReportState: (state, action) => {
         state.error = null
         state.message = ''
         state.status.addNewReport = ''
      }
   },
   extraReducers: (builder) => {

      builder

         // add new report 
         .addCase(addNewReport.pending, (state, action) => {
            state.status.addNewReport = 'pending'
            state.loading.addNewReportLoading = true
         })
         .addCase(addNewReport.fulfilled, (state, action) => {
            const { data, message } = action.payload
            state.status.addNewReport = 'success'
            state.loading.addNewReportLoading = false
            state.report = data
            state.message = message
         })
         .addCase(addNewReport.rejected, (state, action) => {
            const { message, error } = action.payload
            state.status.addNewReport = 'rejected'
            state.loading.addNewReportLoading = false
            state.message = message
            state.error = error
         })


         // fetch All Report 
         .addCase(fetchAllReport.pending, (state, action) => {
            state.status.fetchAllReport = 'pending'
            state.loading.fetchAllReportLoading = true
         })
         .addCase(fetchAllReport.fulfilled, (state, action) => {
            const { data, message } = action.payload
            state.status.fetchAllReport = 'success'
            state.loading.fetchAllReportLoading = false
            state.reports = data
            state.message = message
         })
         .addCase(fetchAllReport.rejected, (state, action) => {
            const { message, error } = action.payload
            state.status.fetchAllReport = 'rejected'
            state.loading.fetchAllReportLoading = false
            state.message = message
            state.error = error
         })

         // update report status  
         .addCase(updateReportStatus.pending, (state, action) => {
            state.status.updateReportStatus = 'pending'
            state.loading.updateReportStatusLoading = true
         })
         .addCase(updateReportStatus.fulfilled, (state, action) => {
            const { data, message } = action.payload
            state.status.updateReportStatus = 'success'
            state.loading.updateReportStatusLoading = false
            // update reports, myreport , report 

            // Update `myReports` array if applicable
            if (state.myReports?.length) {
               state.myReports = state.myReports.map((report) =>
                  report._id === data._id ? data : report
               );
            }

            // Update `reports` array if applicable
            if (state.reports?.length) {
               state.reports = state.reports.map((report) =>
                  report._id === data._id ? data : report
               );
            }

            // Update single `report` object if it matches the updated report
            if (state.report && state.report._id === data._id) {
               state.report = data;
            }


            state.message = message
         })
         .addCase(updateReportStatus.rejected, (state, action) => {
            const { message, error } = action.payload
            state.status.updateReportStatus = 'rejected'
            state.loading.updateReportStatusLoading = false
            state.message = message
            state.error = error
         })


   }
})

export const { resetReportState } = reportSlice.actions
export default reportSlice.reducer