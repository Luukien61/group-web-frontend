import React from 'react';
import DashboardItem from "@/component/admin/DashboardItem.tsx";

const AdminDashboard = () => {
    return (
        <div className={`flex flex-col w-1/2`}>
            <p className={`font-semibold text-[30px]`}>Dashboard</p>
            <div className={`w-full flex flex-wrap py-5`}>
                <DashboardItem/>
                <DashboardItem/>
                <DashboardItem/>
                <DashboardItem/>
            </div>
        </div>
    );
};

export default AdminDashboard;