import React, {useEffect, useState} from 'react';
import {getAllOrdersByStateAndDateAfter, OrderDetail} from "@/axios/Request.ts";
import AdminHeader from "@/component/admin/AdminHeader.tsx";
import OrderCard from "@/component/admin/OrderCard.tsx";

const AdminCompleteOrder = () => {
    const [orders, setOrders] = useState<OrderDetail[]>([]);
    const getAllOrders = async () => {
        const completeOrders : OrderDetail[]= await getAllOrdersByStateAndDateAfter(true,1);
        setOrders(completeOrders)
    }
    useEffect(() => {
        document.title = "Admin complete orders";
        getAllOrders()
    }, []);
    return (
        <div className="w-full">
            <AdminHeader/>
            <div className={`w-full flex flex-wrap`}>
                {
                    orders.length == 0
                        ? <div className={`w-full p-4 bg-inherit`}>
                            <p className={`text-red-600 font-semibold text-[24px]`}>No order found</p>
                        </div>
                        : <>
                            {
                                orders.map((order, index) => (
                                    <OrderCard
                                        refreshAction={()=>{}}
                                        orderDetails={order}
                                        key={index}/>
                                ))
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default AdminCompleteOrder;