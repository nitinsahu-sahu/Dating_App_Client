import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


const Protected = () => {
    const token = localStorage.getItem("user_token");
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Protected
