import React from 'react';
import {Product} from "@/component/CategoryCard.tsx";
import {useLocation} from "react-router-dom";
type Props ={
    product: Product
}
const AdminProductCard :React.FC<Props> = ({product}) => {
    const location = useLocation().pathname
    return (
        <a href={`${location}/${product.id}`}
            className={`p-3 cursor-pointer basis-1/4 w-1/4 `}>
            <div className={`hover:shadow-2xl duration-300 group`}>
                <div className={`rounded flex shadow flex-col border gap-y-2 bg-gray-100 group-hover:bg-gray-200 w-full p-3 ps-4`}>
                    <p className={`font-semibold truncate group-hover:underline`}>{product.name}</p>
                    <p className={`font-semibold text-default_gray px-2`}>Quantity: <span
                        className={`text-inner_blue`}>{product.available ?? 0}</span></p>
                    <div className={`h-fit w-fit px-2 py-1  rounded `}>
                        <p className={`font-semibold text-default_gray`}>Ordering: <span
                            className={`text-default_red `}>{product.ordering}</span></p>
                    </div>

                </div>
            </div>
        </a>
    );
};

export default AdminProductCard;