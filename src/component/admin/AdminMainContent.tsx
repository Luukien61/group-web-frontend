import React, {useEffect} from 'react';
import AdminDashboard from "@/component/admin/AdminDashboard.tsx";
import OrderDashboard from "@/component/admin/OrderDashboard.tsx";
import AdminHeader from "@/component/admin/AdminHeader.tsx";

const AdminMainContent = () => {
    useEffect(() => {
        document.title="Admin Home";
    }, []);
    return (
        <div className={`w-full flex flex-col`}>
            <AdminHeader/>
            <div className={`w-full flex flex-col p-8`}>
                <p className={`font-semibold text-[30px] ml-3`}>Dashboard</p>
                <div className={`flex w-full`}>
                    <AdminDashboard/>
                    <OrderDashboard/>
                </div>
            </div>
        </div>
    );
};

export default AdminMainContent;