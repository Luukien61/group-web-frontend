import React, {useEffect, useState} from 'react';
import {Category} from "@/common/NavMenu.tsx";
import {getProductQuantityByCategory} from "@/axios/Request.ts";

type Props = {
    category: Category;
}
type QuantityColor={
    outerColor: string,
    mainColor: string
}
const DashboardItem : React.FC<Props>= ({category}) => {
    const [productQuantity, setProductQuantity] = useState<number>(0);
    useEffect(() => {
        const getProductQuantity = async ()=>{
            const productQuantity = await getProductQuantityByCategory(category.name);
            setProductQuantity(productQuantity)
        }
        getProductQuantity();
    }, []);
    const quantityColor : QuantityColor={
        outerColor : "bg-[#E2ECFA]",
        mainColor : 'text-[#3B7DDD]'
    }
    const productRange=()=>{
        if(productQuantity === 0){
            quantityColor.outerColor ="bg-[#F5DEE0]"
            quantityColor.mainColor='text-[#DC3545]'
            return
        }
        if(productQuantity<10){
            quantityColor.outerColor ="bg-[#DCEEE9]"
            quantityColor.mainColor='text-[#1CBB8C]'
            return
        }
    }
    productRange()
    return (
        <div className={`aspect-square w-1/2`}>
            <div className={`px-2 w-full`}>
                <div className={`bg-white p-4 flex flex-col rounded-xl aspect-square w-[90%] shadow-xl`}>
                    <div className={`w-full aspect-square flex flex-col gap-y-2`}>
                        <p className={`font-semibold`}>{category.name}</p>
                        <hr className={`bg-black`}/>
                        <div className={`w-full h-full`}>
                            <div className={`flex  flex-wrap gap-x-1 w-full h-full items-center justify-center`}>
                                <div className={`h-fit w-fit px-2 py-1 ${quantityColor.outerColor} rounded-xl `}>
                                    <p className={` text-[45px]  ${quantityColor.mainColor}`}>{productQuantity} </p>
                                </div>
                                <p className={`text-[32px] text-[#939BA2] font-medium`}>products</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardItem;