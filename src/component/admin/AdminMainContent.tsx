import React from 'react';
import AdminDashboard from "@/component/admin/AdminDashboard.tsx";

const AdminMainContent = () => {
    return (
        <div className={`pt-8 flex w-full px-6`}>
            <AdminDashboard/>
            
        </div>
    );
};

export default AdminMainContent;