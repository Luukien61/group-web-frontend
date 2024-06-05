import React from 'react';
import AdminSideBar from "@/component/admin/AdminSideBar.tsx";
import {Outlet} from "react-router-dom";

const AdminHome = () => {
    return (
        <div className={`w-full mx-auto`}>
            <div className={`flex bg-[#F4F6FA] w-full`}>
                <AdminSideBar/>
                <div className={`w-full ml-52`}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;