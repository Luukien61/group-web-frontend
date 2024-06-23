import React from 'react';
import {Product} from "@/component/CategoryCard.tsx";

type ProductSearchProps = {
    product: Product;
    path?:string
}
const ProductSearch: React.FC<ProductSearchProps> = ({product,path}) => {
    return (
        <div className="rounded bg-inherit w-full flex group">
            <a href={`${path ? path:''}/${product.category.name.toLowerCase()}/${product.id}`}
               className={`flex  w-full`}>
                <div className={`w-[60px] h-[60px] mr-2`}>
                    <img className={`object-cover`} src={product.imgs[0]} alt={product.name}/>
                </div>
                <div className={`text-[16px] group-hover:scale-110`}>
                    <p className={`text-default_blue `}>
                        {product.name}
                    </p>
                    <p className={`text-default_red font-medium`}>
                        {product.price[0].currentPrice > 0 ? product.price[0].currentPrice.toLocaleString('vi-VN') + "đ" : "Liên hệ"}
                    </p>
                </div>
            </a>

        </div>
    );
};

export default ProductSearch;