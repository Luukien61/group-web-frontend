import React, {useEffect, useState} from 'react';
import {getOrderQuantityByState, getOrdersQuantityByStateAndDateAfter} from "@/axios/Request.ts";
import {Link} from "react-router-dom";
import {useOrderPending} from "@/zustand/AppState.ts";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

const OrderDashboard = () => {
    const {setOrderPending} = useOrderPending()
    const [pendingOrders, setPendingOrders] = useState<number>(0)
    const [completeOrderByMonth, setCompleteOrderByMonth] = useState<number>(0)
    const getPendingOrders = async () => {
        const response: number = await getOrderQuantityByState(false);
        const completeOrderQuantity: number = await getOrdersQuantityByStateAndDateAfter(true, 1)
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
            <div
                className={`rounded-xl bg-white shadow-2xl z-0 w-full h-[300px] cursor-pointer hover:border hover:border-red-600 duration-300`}>
                <div className={`w-full h-full flex flex-col p-4 gap-y-2`}>
                    <p className={`font-semibold`}>Sales</p>
                    <hr className={`bg-black h-[2px]`}/>
                    <div className={`w-full h-full flex  flex-col items-center gap-x-1 justify-center`}>
                        <OrderChart currentTotal={completeOrderByMonth}/>
                    </div>
                </div>
            </div>
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
const OrderCard: React.FC<Order> = ({target, number, status, title, color, textColor}) => {

    return (
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
type DataChart = {
    name: string | number,
    sale: number
}
const getMonthlyData = (currentMonth: number) : DataChart[]=> {
    const fiveMonthStatistic: DataChart[] = []
    for (let i = 4; i > 0; i--) {
        let month = currentMonth - i
        if (month <= 0) month = month + 12
        const statistic: DataChart = {
            name: "T" + month.toLocaleString(),
            sale: Math.round(Math.random() * 100) + 100
        }
        fiveMonthStatistic.push(statistic)
    }
    return fiveMonthStatistic
}
const OrderChart = ({currentTotal}: { currentTotal: number }) => {
    const [currentMonth, setCurrentMonth] = useState<number>(1)
    const [statistics, setStatistics] = useState<DataChart[]>([])
    useEffect(() => {
        const date = new Date();
        const month = date.getMonth() + 1;
        setCurrentMonth(month)
    }, []);
    useEffect(() => {
        const statics: DataChart[] =getMonthlyData(currentMonth)
        const thisMonthSale : DataChart={
            name: "T"+ currentMonth,
            sale: currentTotal,
        }
        statics.push(thisMonthSale)
        setStatistics(statics)
    }, [currentMonth,currentTotal]);
    return (
        <LineChart width={500} height={200} data={statistics} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
            <Line type="monotone" dataKey="sale" stroke="#8884d8"/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
            <XAxis dataKey="name" stroke={"#00000"}/>
            <YAxis stroke={"#00000"}/>
            <Tooltip/>
        </LineChart>
    );
}