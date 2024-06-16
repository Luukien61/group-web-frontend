import React, {useCallback, useState} from 'react';
import {completeOrder, deleteOrderById, OrderDetail} from "@/axios/Request.ts";
import {DefaultButton} from "@/component/admin/ProductInfo.tsx";
import {CiWarning} from "react-icons/ci";
import {IoMdClose} from "react-icons/io";
import {format, parseISO} from 'date-fns';


type Props = {
    orderDetails: OrderDetail,
    refreshAction: () => void
}
const OrderCard: React.FC<Props> = ({orderDetails, refreshAction}) => {
    const [deleteRequest, setDeleteRequest] = useState<boolean>(false);
    const handleDeleteRequest = useCallback(() => {
        setDeleteRequest(true);
    }, [])
    const handleDeleteOrder = async () => {
        await deleteOrderById(orderDetails.orderId)
        setDeleteRequest(false);
        refreshAction()
    }
    const handleComplete = async () => {
        await completeOrder(orderDetails.orderId)
        refreshAction()
    }
    const handleCloseDeleteWarning = useCallback(() => {
        setDeleteRequest(false);
    }, [])
    const dateTime = format(parseISO(orderDetails.time.toString()), 'HH:mm dd/MM/yyyy')
    return (
        <div className={`w-1/3 p-4 `}>
            <div
                className={`w-full h-[260px] hover:border-red-600 hover:bg-gray-100 cursor-pointer duration-300 flex items-center bg-gray-200 rounded shadow-xl border p-4`}>
                <div className={`w-full flex items-center `}>
                    {
                        deleteRequest
                            ? <div className={`w-full flex flex-col`}>
                                <div className={`w-full flex justify-end `}>
                                    <IoMdClose
                                        onClick={handleCloseDeleteWarning}
                                        className={`cursor-pointer hover:scale-105`}/>
                                </div>
                                <CiWarning size={48} className={`w-full`}/>
                                <p>Are you sure to delete this order?</p>
                                <DefaultButton
                                    label={"Delete"}
                                    style={`bg-red-500 hover:bg-red-700 w-full`}
                                    onclick={handleDeleteOrder}/>
                            </div>
                            : <div className={`w-full flex flex-col gap-y-2`}>
                                <div className={`w-full flex items-center space-x-4 justify-between`}>
                                    <p className={`font-semibold`}>Email:</p>
                                    <p>{orderDetails?.email}</p>
                                </div>
                                <div className={`w-full flex items-center space-x-4 justify-between`}>
                                    <p className={`font-semibold`}>Phone:</p>
                                    <p>{orderDetails?.phone}</p>
                                </div>
                                <div className={`w-full flex items-center space-x-4 justify-between`}>
                                    <p className={`font-semibold`}>Product:</p>
                                    <div>
                                        <a
                                            href={`/${orderDetails?.category?.toLowerCase()}/${orderDetails?.productId}`}
                                            className={`w-full items-center group`}>
                                            <p className={`underline group-hover:text-default_blue`}>{orderDetails?.productName}</p>
                                        </a>
                                    </div>
                                </div>
                                <div className={`w-full flex items-center space-x-4 justify-between`}>
                                    <p className={`font-semibold`}>Time:</p>
                                    <p>{dateTime}</p>
                                </div>
                                {
                                    !orderDetails?.done &&
                                    <div className={`flex w-full gap-x-2 mt-2`}>
                                        <DefaultButton
                                            label={"Delete"}
                                            style={`bg-red-500 hover:bg-red-700 w-full`}
                                            onclick={handleDeleteRequest}/>
                                        <DefaultButton
                                            label={"Complete"}
                                            style={`bg-default_blue hover:bg-blue_other w-full`}
                                            onclick={handleComplete}/>
                                    </div>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderCard;