import React from 'react';
import {IoHardwareChipOutline} from "react-icons/io5";
import {BiMemoryCard} from "react-icons/bi";
import {PiMemoryThin} from "react-icons/pi";
import {MdScreenshotMonitor} from "react-icons/md";

type feature = {
    name: string,
    icon: React.ReactNode,
    property?: string | number
}
export const chip: feature = {
    name: "Chip",
    icon: <IoHardwareChipOutline/>
}
export const rom: feature = {
    name: "Rom",
    icon: <BiMemoryCard/>
}

export const ram: feature = {
    name: "Ram",
    icon: <PiMemoryThin/>
}

export const screen: feature = {
    name: "Screen",
    icon: <MdScreenshotMonitor/>
}

export type productionProp = {
    name: string,
    img: string,
    price: number ,
    category: string,
    features: feature[]
}
type ProductCardProps = {
    item: productionProp;
};
const ProductCard: React.FC<ProductCardProps> = ({item}) => {
    return (
        <div className="rounded bg-gray-100 h-fit flex flex-col gap-y-1 py-1 px-2 group cursor-pointer ">
            <img
                className="object-fill group-hover:scale-105 rounded border border-default_green transform ease-in-out duration-300 "
                alt={item.name}
                src={item.img}
            />
            <p className="text-black font-semibold hover:text-default_blue">{item.name}</p>
            <div className="rounded bg-default_green p-1">
                <p className="text-white font-semibold px-2">
                    {item.price >0 ? item.price.toLocaleString('vi-VN')+"đ" : "Liên hệ"}
                </p>
            </div>
            <div className="bg-gray-300 rounded text-[16px] text-gray-800 flex flex-wrap ">
                {
                    item.features.map(feature => (
                        <div className="w-1/2 gap-2 flex items-center">
                            {feature.icon}
                            {feature.property}
                        </div>
                    ))
                }
            </div>
            <div className=" gap-1 p-1 rounded border-none ring-0 hidden group-hover:block">
                <button type={'button'} className="bg-red_default rounded text-white py-1 px-2 font-semibold w-full">
                    Purchase
                </button>
            </div>
        </div>
    );
};

export default ProductCard;