import React from 'react';
import ProductCard from "./ProductCard.tsx";

type Producer ={
    id: number,
    name: string
}
type Category = {
    id: number,
    name: string,
    producers: Producer[]
}
type Price ={
    "id": number,
    "ram": number,
    "rom": number,
    "currentPrice": number,
    "previousPrice": number
}
type Color ={
    id: number,
    color: string,
    link: string
}
type Feature ={
    id: number,
    screen: string,
    rearCamera: number[],
    frontCamera: number[],
    chip: string,
    battery: number,
    OS: string,
    memory: Price[],
    madeTime: Date,
}
type Description ={
    id: number,
    title: string,
    content: string
}
export type Product = {
    "id": string,
    "name": string,
    "category": Category,
    "imgs": string[],
    "price": Price[],
    "color": Color[],
    "features": Feature,
    "description": Description,
    "producer": Producer
}
type CategoryProp ={
    name: string,
    product: Product[]
}

const CategoryCard : React.FC<CategoryProp> = ({name,product}) => {
    return (
        <div className="rounded drop-shadow h-fit bg-white p-2">
            <div className="flex items-center px-2 py-1">
                <p className={`text-default_red font-medium text-[24px]`}>{name}</p>
                <div className="flex items-center justify-end flex-1">
                    <a className="text-blue-500 hover:underline cursor-pointer pr-2">View more</a>
                </div>
            </div>
            <div className="h-fit max-w-[1316px] flex flex-wrap gap-x-2 justify-start gap-y-2 px-2">
                {
                   product.map((product, index) => (
                       <ProductCard key={index} product={product}/>
                   ))
                }
            </div>
        </div>
    );
};

export default CategoryCard;