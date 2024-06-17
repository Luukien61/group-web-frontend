import React, {useEffect} from 'react';
import AdminDashboard from "@/component/admin/AdminDashboard.tsx";
import OrderDashboard from "@/component/admin/OrderDashboard.tsx";
import AdminHeader from "@/component/admin/AdminHeader.tsx";
import {IoMdAddCircleOutline} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const AdminMainContent = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title="Admin Home";
    }, []);
    const handleAddProduct = () => {
        navigate('new-product', {preventScrollReset: false})
    }
    return (
        <div className={`w-full flex flex-col`}>
            <AdminHeader/>
            <div className={`w-full flex flex-col p-8`}>
                <div className={`w-full flex flex-wrap mt-4 pr-5`}>
                    <p className={`font-semibold flex-1 text-[30px] ml-3`}>Dashboard</p>
                    <button
                        onClick={handleAddProduct}
                        className={`h-2/3 p-2 rounded px-3 text-white flex gap-x-2 items-center hover:bg-blue_other bg-inner_blue font-medium`}>
                        <IoMdAddCircleOutline size={24}/>
                        Add
                    </button>
                </div>
                <div className={`flex w-full`}>
                <AdminDashboard/>
                    <OrderDashboard/>
                </div>
            </div>
        </div>
    );
};

export default AdminMainContent;