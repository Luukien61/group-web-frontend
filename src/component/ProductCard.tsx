import React from 'react';
import {IoHardwareChipOutline} from "react-icons/io5";
import {BiMemoryCard} from "react-icons/bi";
import {PiMemoryThin} from "react-icons/pi";
import {MdScreenshotMonitor} from "react-icons/md";
import {Product} from "@/component/CategoryCard.tsx";


type ProductCardProps = {
    widthClass: string,
    product: Product;
};
const ProductCard: React.FC<ProductCardProps> = ({product,widthClass}) => {
    const category = product.category.name.toLowerCase()
    return (
        <div className={`${widthClass} flex justify-center items-center`}>
            <a href={`/${category}/${product.id}`}>
                <div
                    className="rounded bg-outer_green h-fit flex flex-col gap-y-1 py-1 px-2 group cursor-pointer max-w-[250px] ">
                    <img
                        className="object-fill h-[230px] h-max-[230px] group-hover:scale-105 rounded border border-default_green transform ease-in-out duration-300 "
                        alt={product.name}
                        src={product.imgs[0]}
                    />
                    <p className="text-black font-semibold hover:text-default_blue">{product.name}</p>
                    <div className="rounded bg-white p-1">
                        <p className="text-default_red font-semibold px-2">
                            {product.price[0].currentPrice > 0 ? product.price[0].currentPrice.toLocaleString('vi-VN') + "đ" : "Liên hệ"}
                        </p>
                    </div>
                    <div className="bg-[#FFEFEF] rounded pl-1 text-[12px] text-gray-800 flex flex-wrap">
                        <div
                            className="w-1/2 gap-2 flex items-center">
                            <IoHardwareChipOutline/>
                            {product.features.chip}
                        </div>
                        <div
                            className="w-1/2 gap-2 flex items-center">
                            <BiMemoryCard/>
                            {product.features.memory[0].rom}GB
                        </div>
                        <div
                            className="w-1/2 gap-2 flex items-center">
                            <PiMemoryThin/>
                            {product.features.memory[0].ram}GB
                        </div>
                        <div
                            className="w-1/2 gap-2 flex items-center">
                            <MdScreenshotMonitor/>
                            {product.features.screen.substring(0, 8)}
                        </div>
                    </div>
                    <div className="absolute  gap-1 p-1 rounded border-none ring-0 hidden group-hover:block">
                        <button type={'button'}
                                className="bg-red_default rounded text-white py-1 px-2 font-semibold w-full">
                            Purchase
                        </button>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ProductCard;