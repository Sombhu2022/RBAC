import React from 'react'
import AdminDashBoard from './Components/AdminDashBoard'
import { useSelector } from 'react-redux'
import UserDashBoard from './Components/UserDashBoard'
import ControllerDashBoard from './Components/ControllerDashBoard'

function DashBoard() {
  const { user } = useSelector((state)=>state.user)
  return (
    <div>
      {
        user?.role === 'admin'? 
        <AdminDashBoard/>:
        user?.role === 'user'? <UserDashBoard/> : <ControllerDashBoard/>
      }
       
    </div>
  )
}

export default DashBoard