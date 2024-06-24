import React, {useEffect, useState} from 'react';
import {getOrderQuantityByState, getOrdersQuantityByStateAndDateAfter} from "@/axios/Request.ts";
import {Link} from "react-router-dom";
import {useOrderPending} from "@/zustand/AppState.ts";

const OrderDashboard = () => {
    const {setOrderPending}= useOrderPending()
    const [pendingOrders, setPendingOrders] = useState<number>(0)
    const [completeOrderByMonth, setCompleteOrderByMonth] = useState<number>(0)
    const getPendingOrders = async () => {
        const response : number = await getOrderQuantityByState(false);
        const completeOrderQuantity : number = await getOrdersQuantityByStateAndDateAfter(true,1)
        setPendingOrders(response);
        setCompleteOrderByMonth(completeOrderQuantity)
        setOrderPending(response)
    }
    useEffect(() => {
        getPendingOrders()
    }, []);
    return (
        <div className={`w-1/2 p-5 pl-11 flex flex-col gap-y-7`}>
            <OrderCard
                title={"Orders"}
                target={'order'}
                status={"request orders"}
                number={pendingOrders}
                color={"bg-outer_red"}
            />
            <OrderCard
                title={"Completed orders within a month"}
                target={'order/complete'}
                status={"complete orders"}
                number={completeOrderByMonth}
                color={"bg-outer_blue"}
                textColor={"text-inner_blue"}
            />
        </div>
    );
};

export default OrderDashboard;

type Order = {
    target: string,
    title: string,
    number: number,
    status: string,
    color: string,
    textColor?: string
}
const OrderCard : React.FC<Order>=({target,number, status, title,color,textColor})=>{

    return(
        <Link to={`${target}`}>
            <div
                className={`rounded-xl bg-white shadow-2xl z-0 w-full h-[260px] cursor-pointer hover:border hover:border-red-600 duration-300`}>
                <div className={`w-full h-full flex flex-col p-4 gap-y-2`}>
                    <p className={`font-semibold`}>{title}</p>
                    <hr className={`bg-black h-[2px]`}/>
                    <div className={`w-full h-full flex  flex-col items-center gap-x-1 justify-center`}>
                        <div className={`h-fit w-fit px-2 py-1 rounded-xl ${color}`}>
                            <p className={` text-[45px] ${textColor ?? "text-inner_red"}`}>{number}</p>
                        </div>
                        <p className={`text-[32px] text-[#939BA2] font-medium`}>{status}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}