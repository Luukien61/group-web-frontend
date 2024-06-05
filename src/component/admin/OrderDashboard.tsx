import React from 'react';

const OrderDashboard = () => {

    return (
        <div className={`w-1/2 p-5 pl-11`}>
            <div className={`rounded-xl bg-white shadow-2xl w-full h-[260px]`}>
                <div className={`w-full h-full flex flex-col p-4 gap-y-2`}>
                    <p className={`font-semibold`}>Order</p>
                    <hr className={`bg-black `}/>
                    <div className={`w-full h-full flex flex-wrap items-center gap-x-1 justify-center`}>
                        <div className={`h-fit w-fit px-2 py-1 bg-outer_red  rounded-xl `}>
                            <p className={` text-[45px] text-inner_red`}> 50</p>
                        </div>
                        <p className={`text-[32px] text-[#939BA2] font-medium`}>requested orders</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrderDashboard;