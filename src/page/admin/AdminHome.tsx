import React from 'react';
import AdminSideBar from "@/component/admin/AdminSideBar.tsx";

const AdminHome = () => {
    return (
        <div className={`w-full grid grid-cols-12 `}>
            <AdminSideBar/>

        </div>
    );
};

export default AdminHome;