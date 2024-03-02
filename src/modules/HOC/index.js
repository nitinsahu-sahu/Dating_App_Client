import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


const Protected = () => {
    const token = localStorage.getItem("u_token");
    return (
        token ? <Outlet /> : <Navigate to="/users/sign_in" />
    )
}

export default Protected

