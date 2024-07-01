import React, {useEffect, useState} from 'react';
import AdminSideBar from "@/component/admin/AdminSideBar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import useTokenRefresh from "@/hooks/useTokenRefresh.ts";
import {authenticateRequest} from "@/axios/Request.ts";
import {Toaster} from "react-hot-toast";

const AdminHome = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate();
    const isAuthenticated = useTokenRefresh();
    useEffect(() => {
        const authenticate = async () => {
            const state = await authenticateRequest();
            if (!state) {
                if (!isAuthenticated) {
                    navigate('/login', {replace: true});
                }
            } else setIsLoading(false)
        };
        authenticate();
    }, [navigate]);
    return (
        <>
            {
                !isLoading && <div className={`w-full mx-auto`}>
                    <Toaster toastOptions={
                        {
                            duration: 1500
                        }
                    }/>
                    <div className={`flex bg-[#F4F6FA] w-full`}>
                        <AdminSideBar/>
                        <div className={`w-full ml-52 flex justify-center`}>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AdminHome;