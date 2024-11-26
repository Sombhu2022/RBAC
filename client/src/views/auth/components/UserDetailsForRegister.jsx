import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { regUser } from '../../../store/user/userController';
import { resetState } from '../../../store/user/userSlice';
import { toast } from 'react-toastify';

function UserDetailsForRegister({onComplete , onEmail }) {

    const [email , setEmail] = useState('')
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    

    const dispatch = useDispatch()
    const { user , loading , status , isAuthenticate , message } = useSelector((state)=>state.user)

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(regUser({name , email , password}))
    };

    useEffect(()=>{
       
         if(status.regUser === 'success'){
            if(message){
                toast.success(message)
            }
            onComplete()
            onEmail(email)
            dispatch(resetState())
         } else if(status.regUser === 'rejected'){
           toast.error(message)
         }
        
     }, [message , status])

  return (
   <form onSubmit={handleRegister}>
    <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>
    <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="custom_input"
        required
    />
    <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="custom_input"
        required
    />
    <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
       className="custom_input"
        required
    />
    <button className="custom_button" disabled={loading.regUserLoading?true:false}>
       {loading.regUserLoading?"Loading...":" Continue"}
    </button>
</form>
  )
}

export default UserDetailsForRegister