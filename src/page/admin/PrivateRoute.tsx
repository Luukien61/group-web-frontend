import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

type PrivateRouteProps = {
    isAuthenticated: boolean
}
const PrivateRoute : React.FC<PrivateRouteProps> = ({isAuthenticated} ) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/test" />;
};

export default PrivateRoute;