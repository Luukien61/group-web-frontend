import React from 'react';
import {Product} from "@/component/CategoryCard.tsx";

type ProductSearchProps = {
    product: Product;
}
const imgSrc: string = "https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Thumbs/2023/10/30/638342502751589917_ip-15-pro-max-dd-bh-2-nam.jpg"
const ProductSearch: React.FC<ProductSearchProps> = ({product}) => {
    return (
        <div className="rounded bg-inherit w-full flex group">
            <a href={`/${product.category.name.toLowerCase()}/${product.id}`}
               className={`flex  w-full`}>
                <div className={`w-[60px] h-[60px] mr-2`}>
                    <img className={`object-cover`} src={imgSrc} alt={product.name}/>
                </div>
                <div className={`text-[16px] group-hover:scale-110`}>
                    <p className={`text-default_blue `}>
                        {product.name}
                    </p>
                    <p className={`text-default_red font-medium`}>
                        {product.price[0].currentPrice.toLocaleString('vi-VN')}đ
                    </p>
                </div>
            </a>

        </div>
    );
};

export default ProductSearch;