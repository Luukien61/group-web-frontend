import React, {useEffect, useState} from 'react';
import {IoHardwareChipOutline} from "react-icons/io5";
import {BiMemoryCard} from "react-icons/bi";
import {PiMemoryThin} from "react-icons/pi";
import {MdScreenshotMonitor} from "react-icons/md";
import {Product} from "@/component/CategoryCard.tsx";
import {RatingCount} from "@/component/RatingComponent.tsx";


type ProductCardProps = {
    widthClass: string,
    product: Product;
};

type ProductSortInfo = {
    style?: string,
    text: string,
    icon: React.ReactNode
}
const ProductCard: React.FC<ProductCardProps> = ({product, widthClass}) => {
    const category = product.category.name.toLowerCase()
    const [average, setAverage] = useState<number>(0)
    const [productSortInfo, setProductSortInfo] = useState<ProductSortInfo[]>([])
    useEffect(() => {
        if (product.rating) {
            const productRating = product.rating.average
            setAverage(productRating)
        }
    }, [product.rating])
    useEffect(() => {
        const sortInfo: ProductSortInfo[] = [
            {
                icon: <IoHardwareChipOutline/>,
                text: product.features.chip,
            },
            {
                icon: <BiMemoryCard/>,
                text: `${product.features.memory[0].rom}GB`,
            },
            {
                icon: <PiMemoryThin/>,
                text: `${product.features.memory[0].ram}GB`
            },
            {
                icon: <MdScreenshotMonitor/>,
                text: product.features.screen.substring(0, 8)
            }
        ]
        setProductSortInfo(sortInfo)
    }, [product]);
    return (
        <div draggable={false}
             className={`${widthClass} block justify-center items-center  `}>
            <a draggable={false}
               href={`/${category}/${product.id}`}>
                <div
                    className="rounded bg-white *:text-[0.875rem] overflow-hidden hover:shadow-xl h-fit flex flex-col border-r border-b border-t gap-y-1 py-2 px-2 group cursor-pointer max-w-[260px] ">
                    <div className={`h-[230px] p-2`}>
                        <img
                            className="object-cover h-[200px] group-hover:scale-105 rounded transform ease-in-out duration-300 "
                            alt={product.name}
                            src={product.imgs[0]}
                        />
                    </div>
                    <div className={`leading-6 h-[3rem]`}>
                        <h3 className="text-gray-600 max-w-full overflow-hidden font-medium pl-2 pt-1 hover:text-default_blue ">{product.name}</h3>
                    </div>
                    <div className="rounded border p-1">
                        <p className="text-default_red font-semibold px-2">
                            {product.price[0].currentPrice > 0 ? product.price[0].currentPrice.toLocaleString('vi-VN') + "đ" : "Liên hệ"}
                        </p>
                    </div>
                    <div className="bg-outer_green py-1 rounded pl-2 *:text-[0.75rem]  text-gray-800 flex flex-wrap">
                        {
                            productSortInfo.map((value, index) =>
                                <div key={index}
                                     className={`w-1/2 gap-2 flex items-center ${value.style ? value.style : ""}`}>
                                    {value.icon}
                                    <p className={`whitespace-nowrap truncate`}>{value.text}</p>
                                </div>
                            )
                        }
                    </div>

                    <div className={`w-full flex justify-start items-center mt-1 pl-1`}>
                        <RatingCount rating={average} numSize={`text-[18px]`} startSize={`scale-90`}/>
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