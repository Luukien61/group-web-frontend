import React, {useCallback, useEffect, useState} from 'react';
import ProductCard from "./ProductCard.tsx";
import {fetchProductsCategory} from "@/axios/Request.ts";
import {useFilter} from "@/zustand/AppState.ts";

type Producer = {
    id: number,
    name: string
}
type Category = {
    id: number,
    name: string,
    producers: Producer[]
}
type Price = {
    "id": number,
    "ram": number,
    "rom": number,
    "currentPrice": number,
    "previousPrice": number
}
type Color = {
    id: number,
    color: string,
    link: string
}
type Feature = {
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
type Description = {
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
type CategoryProp = {
    producer?: string[],
    price?: number[],
    name: string,
    url?: string,
    category: string,
    page?: number,
    initialSize: number,
    pageable: boolean
}

const CategoryCard: React.FC<CategoryProp> = ({
                                                  category,
                                                  name,
                                                  url,
                                                  page = 0,
                                                  initialSize,
                                                  pageable
                                              }) => {
    const [size, setSize] = useState<number>(initialSize)
    const [last, setLast] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const {producerFilter, priceFilter} = useFilter()
    const handleViewMoreClick = useCallback(() => {
        setSize(pre => pre + initialSize);
    }, [initialSize]);

    useEffect(() => {
        const fetchProductByCategory = async () => {
            const response = await fetchProductsCategory({
                category: category,
                size: size,
                producer: producerFilter,
                price: priceFilter,
                page: page
            })
                .then((response) => response)
            const products= response.content
            setLast(response.last)
            setProducts(products)
        }
        fetchProductByCategory()
    }, [category, size, priceFilter, page, producerFilter]);
    return (
        <div className="rounded drop-shadow h-fit bg-white p-2 ">
            <div className="flex items-center px-2 py-1">
                <p className={`text-default_red font-medium text-[24px]`}>{name}</p>
                <div className="flex items-center justify-end flex-1">
                    {/*<a className="text-blue-500 hover:underline cursor-pointer pr-2">View more</a>*/}
                    {url &&
                        <a className={`text-blue-500 hover:underline cursor-pointer pr-2`} href={url}>View more</a>}
                </div>
            </div>
            <div className="h-fit max-w-[1316px] flex flex-wrap gap-x-2 justify-start gap-y-2 px-2 pb-2">
                {
                    products.length === 0
                        ? <p>No device found</p>
                        : (
                            products.map((product, index) => (
                                <ProductCard key={index} product={product}/>
                            ))
                        )
                }
            </div>
            {
                pageable && !last && (
                    <div className={`w-full flex items-center justify-center pt-6 pb-4`}>
                        <button
                            onClick={()=>handleViewMoreClick()}
                            className={`hover:text-default_blue hover:scale-105 rounded bg-default_background p-1`}>View more</button>
                    </div>
                )
            }
        </div>
    );
};

export default CategoryCard;