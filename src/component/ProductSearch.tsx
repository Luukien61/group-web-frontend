import React from 'react';
import {Product} from "@/component/CategoryCard.tsx";
type ProductSearchProps = {
    products: Product;
}
const ProductSearch :React.FC<ProductSearchProps> = ({products}) => {
    return (
        <div className="rounded bg-inherit w-full flex">
            <div>
                <img className={``} src={products.imgs[0]} alt={products.name}/>
            </div>

        </div>
    );
};

export default ProductSearch;