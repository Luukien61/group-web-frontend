import React from 'react';
import AdminSideBar from "@/component/admin/AdminSideBar.tsx";
import AdminMainBody from "@/component/admin/AdminMainBody.tsx";

const AdminHome = () => {
    return (
        <div className={`w-full  mx-auto max-w-8xl`}>
            <div className={`flex`}>
                <AdminSideBar />
                <AdminMainBody/>
            </div>
        </div>
    );
};

export default AdminHome;