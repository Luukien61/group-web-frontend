import React from 'react';
import ProductCard from "./ProductCard.tsx";
import {iphone15} from "../common/Content.tsx";

type CategoryProp ={
    name: string
}
const CategoryCard : React.FC<CategoryProp> = (category) => {
    return (
        <div className="rounded drop-shadow h-fit bg-white p-2">
            <div className="flex items-center px-2 py-1">
                <p>{category.name}</p>
                <div className="flex items-center justify-end flex-1">
                    <a className="text-blue-500 hover:underline cursor-grab">View more</a>
                </div>
            </div>
            <div className="h-fit flex flex-wrap gap-x-1">
                <ProductCard item={iphone15}/>
            </div>
        </div>
    );
};

export default CategoryCard;