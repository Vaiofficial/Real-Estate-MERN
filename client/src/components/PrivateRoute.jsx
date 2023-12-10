import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {

    const {currentUser} = useSelector((state)=>state.user);
    //so outlet ka mtlb child show karna , humne jase app.jsx mai profile section ko child bnaya hai. Means agr currentUser true hai ,means login hai to profile page par navigate karega else sigin page par.
    return currentUser ? <Outlet/> :<Navigate to='/sign-in'/>
}
