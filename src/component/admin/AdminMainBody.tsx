import React from 'react';
import AdminHeader from "@/component/admin/AdminHeader.tsx";
import AdminMainContent from "@/component/admin/AdminMainContent.tsx";

const AdminMainBody = () => {
    return (
        <div className={`w-full bg-[#F4F6FA]`}>
            <AdminHeader />
            <AdminMainContent/>
        </div>
    );
};

export default AdminMainBody;