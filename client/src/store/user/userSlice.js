import { createSlice } from "@reduxjs/toolkit"
import { addTwoStepVerification, authenticateUser, fetchAllUserWithPost, loginUser, logoutUser, regUser, sendOtpForProfileValidation, updateUserRole, verifyOtpForProfileValidation } from "./userController"


const initialState = {
    users:[],
    user:{},
    isAuthenticate:false,
    status:{
        regUser:'',
        loginUser:'',
        authenticateUser:'',
        logoutUser:'',
        changePassword:'',
        sendOtp:'',
        verifyOtp:"",
        forgetPassword:'',
        twoStepAuth:'',
        fetchAllUser:'',
        updateUserRole: ''

    },
    loading :{
        regUserLoading:false,
        loginUserLoading:false,
        authenticateUserLoading:false,
        logoutUserLoading:false,
        changePasswordLoading:false,
        sendOtpLoading:false,
        forgetPasswordLoading:false,
        verifyOtpLoading:false,
        twoStepAuthLoading:false,
        fetchAllUserLoading : false,
        updateUserRoleLoading:false
    },
    error:null,
    message:null,
}

export const userSlice = createSlice({
    name:'user',
    initialState ,
    reducers:{

        resetState :(state , action)=>{
            state.error = null
            state.message = ''
            state.status.regUser = ''
            state.status.loginUser = ''
            state.status.authenticateUser = ''
            state.status.logoutUser = ''
            state.status.changePassword = ''
            state.status.sendOtp = ''
            state.status.verifyOtp = ""
            state.status.forgetPassword = ''
            state.status.twoStepAuth = '',
            state.status.updateUserRole = '',
            state.status.fetchAllUser = ''

        }

    },

    extraReducers:(builder)=>{

     // register user ...    
        // pending 
        builder.addCase(regUser.pending , (state , action)=>{
             
            state.error = null
            state.message = ''
            state.status.regUser = 'pending'
            state.loading.regUserLoading = true

        })
        // fulfilled or success
        builder.addCase(regUser.fulfilled , (state , action)=>{
            const { data , message} = action.payload
            state.error = null
            state.message = message || 'user register success'
            state.status.regUser = 'success'
            state.loading.regUserLoading = false
            state.isAuthenticate = true
            state.user = data
            
        })
        // rejected 
        builder.addCase(regUser.rejected , (state , action)=>{ 
            state.error = action.payload?.message || {}
            state.isAuthenticate = false
            state.message = action.payload?.message  || ' something error , please try aggain '
            state.status.regUser = 'rejected'
            state.loading.regUserLoading = false
        })


     // fetch user details...    
        // pending 
        builder.addCase(authenticateUser.pending , (state , action)=>{

            state.error = null
            state.message = ''
            state.status.authenticateUser = 'pending'
            state.loading.authenticateUserLoading = true

        })
        // fulfilled or success
        builder.addCase(authenticateUser.fulfilled , (state , action)=>{
            const { data , message} = action.payload
            state.isAuthenticate = true
            state.user = data
            state.message = message || 'user register success'
            state.status.authenticateUser = 'sucess'
            state.loading.authenticateUserLoading = false
            state.error = null
            
        })
        // rejected 
        builder.addCase(authenticateUser.rejected , (state , action)=>{ 
            state.error = action.payload?.message || {}
            state.isAuthenticate = false
            state.message = action.payload?.message  || ' something error , please try aggain '
            state.status.authenticateUser = 'rejected'
            state.loading.authenticateUserLoading = false
        })
     
        

     // login  user    
        // pending 
        builder.addCase(loginUser.pending , (state , action)=>{
             
            state.error = null
            state.message = ''
            state.status.loginUser = 'pending'
            state.loading.loginUserLoading = true

        })
        // fulfilled or success
        builder.addCase(loginUser.fulfilled , (state , action)=>{
            const { data , message } = action.payload
            if(data){
                state.user = data
                state.isAuthenticate = true
            }else{
                state.user ={}
                state.isAuthenticate = false
            }
            state.message = message 
            state.status.loginUser = 'success'
            state.loading.loginUserLoading = false
            state.error = null
            
        })
        // rejected 
        builder.addCase(loginUser.rejected , (state , action)=>{ 
            state.error = action.payload?.message || {}
            state.isAuthenticate = false
            state.message = action.payload?.message  || ' something error , please try aggain '
            state.status.loginUser = 'rejected'
            state.loading.loginUserLoading = false
        })


     // logout  user    
        // pending 
        builder.addCase(logoutUser.pending , (state , action)=>{
             
            state.error = null
            state.message = ''
            state.status.logoutUser = 'pending'
            state.loading.logoutUserLoading = true

        })
        // fulfilled or success
        builder.addCase(logoutUser.fulfilled , (state , action)=>{
            const {  message } = action.payload
            state.isAuthenticate = false
            state.user = {}
            state.message = message || 'user logout success'
            state.status.logoutUser = 'success'
            state.loading.logoutUserLoading = false
            state.error = null
            
        })
        // rejected 
        builder.addCase(logoutUser.rejected , (state , action)=>{ 
            state.error = action.payload?.message || {}
            state.isAuthenticate = false
            state.message = action.payload?.message  || ' something error , please try aggain '
            state.status.loginUser = 'rejected'
            state.loading.loginUserLoading = false
        })

     // send otp for user validation  user    
        // pending 
        builder.addCase(sendOtpForProfileValidation.pending , (state , action)=>{
             
            state.error = null
            state.message = ''
            state.status.sendOtp = 'pending'
            state.loading.sendOtpLoading = true

        })
        // fulfilled or success
        builder.addCase(sendOtpForProfileValidation.fulfilled , (state , action)=>{
            const {  message } = action.payload
            state.message = message || 'otp send success , please check your email'
            state.status.sendOtp = 'success'
            state.loading.sendOtpLoading = false
            state.error = null
            
        })
        // rejected 
        builder.addCase(sendOtpForProfileValidation.rejected , (state , action)=>{ 
            state.error = action.payload?.message || {}
            state.message = action.payload?.message  || ' something error , please try aggain '
            state.status.sendOtp = 'rejected'
            state.loading.sendOtpLoading = false
        })

     // verify Otp for user velidation 
        // pending 
        builder.addCase(verifyOtpForProfileValidation.pending , (state , action)=>{
             
            state.error = null
            state.message = ''
            state.status.verifyOtp = 'pending'
            state.loading.verifyOtpLoading = true

        })
        // fulfilled or success
        builder.addCase(verifyOtpForProfileValidation.fulfilled , (state , action)=>{
            const { data ,  message } = action.payload
            state.message = message || 'otp verify success'
            state.status.verifyOtp = 'success'
            state.loading.verifyOtpLoading = false
            state.error = null
            state.isAuthenticate =  true
            state.user = data 
            
        })
        // rejected 
        builder.addCase(verifyOtpForProfileValidation.rejected , (state , action)=>{ 
            state.error = action.payload?.message || {}
            state.message = action.payload?.message  || ' something error , please try aggain '
            state.status.verifyOtp = 'rejected'
            state.loading.verifyOtpLoading = false
        })

     // add two step auth  
        // pending 
        builder.addCase(addTwoStepVerification.pending , (state , action)=>{
             
            state.error = null
            state.message = ''
            state.status.twoStepAuth = 'pending'
            state.loading.twoStepAuthLoading = true

        })
        // fulfilled or success
        builder.addCase(addTwoStepVerification.fulfilled , (state , action)=>{
            const {  message , data } = action.payload
            state.message = message
            state.status.twoStepAuth = 'success'
            state.loading.twoStepAuthLoading = false
            state.error = null
            state.user = data
        })
        // rejected 
        builder.addCase(addTwoStepVerification.rejected , (state , action)=>{ 
            state.error = action.payload?.message || {}
            state.message = action.payload?.message  || ' something error , please try aggain '
            state.status.twoStepAuth = 'rejected'
            state.loading.twoStepAuthLoading = false
        })

   
   // admin can access this fetures 
        
        // fetch all user details if you are admin...    
        // pending 
        builder.addCase(fetchAllUserWithPost.pending , (state , action)=>{

            state.error = null
            state.message = ''
            state.status.fetchAllUser = 'pending'
            state.loading.fetchAllUserLoading = true

        })
        // fulfilled or success
        builder.addCase(fetchAllUserWithPost.fulfilled , (state , action)=>{
            const { data , message} = action.payload
            state.users = data
            state.message = message || 'user register success'
            state.status.fetchAllUser = 'sucess'
            state.loading.fetchAllUserLoading = false
            state.error = null
            
        })
        // rejected 
        builder.addCase(fetchAllUserWithPost.rejected , (state , action)=>{ 
            state.error = action.payload?.message || {}
            state.message = action.payload?.message  || ' something error , please try aggain '
            state.status.fetchAllUser = 'rejected'
            state.loading.fetchAllUserLoading = false
        })

     // update user role  user details if you are admin...    
        // pending 
        builder.addCase(updateUserRole.pending , (state , action)=>{

            state.error = null
            state.message = ''
            state.status.updateUserRole = 'pending'
            state.loading.updateUserRoleLoading = true

        })
        // fulfilled or success
        builder.addCase(updateUserRole.fulfilled , (state , action)=>{
            const {  message} = action.payload
            state.message = message || 'user register success'
            state.status.updateUserRole = 'sucess'
            state.loading.updateUserRoleLoading = false
            state.error = null
            
        })
        // rejected 
        builder.addCase(updateUserRole.rejected , (state , action)=>{ 
            state.error = action.payload?.message || {}
            state.message = action.payload?.message  || ' something error , please try aggain '
            state.status.updateUserRole = 'rejected'
            state.loading.updateUserRoleLoading = false
        })

    }
})


export const { resetState } = userSlice.actions

export default userSlice.reducer 