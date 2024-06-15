import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useLoginState} from "@/zustand/AppState.ts";

type PrivateRouteProps = {
    isAuthenticated: boolean,
}
const PrivateRoute : React.FC<PrivateRouteProps> = () => {
    const {isLogin}= useLoginState()
    return isLogin ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;