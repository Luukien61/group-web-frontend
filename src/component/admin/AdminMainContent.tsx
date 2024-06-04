import React from 'react';
import AdminDashboard from "@/component/admin/AdminDashboard.tsx";
import OrderDashboard from "@/component/admin/OrderDashboard.tsx";

const AdminMainContent = () => {
    return (
        <div className={`pt-8 w-full px-6 flex flex-col`}>
            <p className={`font-semibold text-[30px] ml-3`}>Dashboard</p>
            <div className={`flex w-full`}>
                <AdminDashboard/>

                <OrderDashboard/>
            </div>
        </div>
    );
};

export default AdminMainContent;