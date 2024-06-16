import React, {useEffect, useState} from 'react';
import AdminHeader from "@/component/admin/AdminHeader.tsx";
import {getAllOrderByState, OrderDetail} from "@/axios/Request.ts";
import OrderCard from "@/component/admin/OrderCard.tsx";
import {useOrderPending} from "@/zustand/AppState.ts";

const AdminOrder = () => {
    const {setOrderPending} = useOrderPending()
    const [orders, setOrders] = useState<OrderDetail[]>([]);
    const getAllOrders = async () => {
        const allPendingOrders: OrderDetail[] = await getAllOrderByState(false);
        setOrders(allPendingOrders)
        setOrderPending(allPendingOrders.length)
    }
    useEffect(() => {
        document.title = "Admin Orders";
        getAllOrders()
    }, []);

    return (
        <div className="w-full">
            <AdminHeader/>
            <div className={`w-full flex flex-wrap mt-4`}>
                {
                    orders.length == 0
                        ? <div className={`w-full p-4 bg-inherit`}>
                            <p className={`text-red-600 font-semibold text-[24px]`}>No order found</p>
                        </div>
                        : <>
                            {
                                orders.map((order, index) => (
                                    <OrderCard
                                        refreshAction={getAllOrders}
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

export default AdminOrder;