import React, {useCallback, useEffect, useState} from 'react';
import ProductCard from "./ProductCard.tsx";
import {fetchProductsCategory} from "@/axios/Request.ts";
import {useLocation} from "react-router-dom";

export type Producer = {
    id?: number,
    name: string
}
export type Category = {
    id?: number,
    name: string,
    producers?: Producer[]
}
export type Price = {
    "id"?: number,
    "ram": number,
    "rom": number,
    "currentPrice": number,
    "previousPrice": number
}
export type Color = {
    id?: number,
    color: string,
    link: string
}
export type Feature = {
    id?: number,
    screen: string,
    rearCamera: number[],
    frontCamera: number[],
    chip: string,
    battery: number,
    os: string,
    memory: Price[],
    madeTime: Date,
}
export type ContentChild={
    id?:number,
    title?: string,
    content?: string,
    image?: string,
}
export type Description = {
    id?: number,
    title: string,
    contentChild: ContentChild[]
}
export type Rating = {
    id?: number;
    average: number;
    fiveStarts: number;
    fourStarts: number;
    threeStarts: number;
    twoStarts: number;
    oneStart: number;
}
export type Product = {
    "id": string,
    "name": string,
    "available": number,
    "ordering": number
    "category": Category,
    "imgs": string[],
    "price": Price[],
    "color": Color[],
    "features": Feature,
    "description": Description,
    "producer": Producer,
    "totalQuantity": number,
    "rating"?: Rating
}
type CategoryProp = {
    producer?: string[],
    price?: number[],
    name: string,
    url?: string,
    category: string,
    page?: number,
    initialSize: number,
    pageable: boolean,
    widthClass: string,
    heightClass?: string,
    renderWhenEmpty?: boolean,
}

const CategoryCard: React.FC<CategoryProp> = ({
                                                  category,
                                                  name,
                                                  url,
                                                  page = 0,
                                                  initialSize,
                                                  pageable,
                                                  widthClass,
                                                  renderWhenEmpty = false,
                                                  heightClass
                                              }) => {
    const [size, setSize] = useState<number>(initialSize)
    const [last, setLast] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [producerSort, setProducerSort] = useState<string[]>([])
    const [priceSort, setPriceSort] = useState<number[]>([])
    // const {producerFilter, priceFilter} = useFilter()
    const search = useLocation().search
    const handleViewMoreClick = useCallback(() => {
        setSize(pre => pre + initialSize);
    }, [initialSize]);

    useEffect(() => {
        const params = search.slice(1).split("&")
        const producersParam = params.filter((value) => value.includes("producer"))
        const priceParams = params.filter((value) => value.includes("price"))
        if (producersParam.length > 0) {
            const producerList = producersParam[0]
            const equalIndex = producerList.indexOf("=")
            const producers = producerList.slice(equalIndex + 1).split(",")
            setProducerSort(producers)
        }else {
            setProducerSort([])
        }
        if (priceParams.length > 0) {
            //[min-price=2000000', 'max-price=4000000]
            const priceFilter = priceParams.map((value) => parseInt(value.split("=")[1]))
            setPriceSort(priceFilter)
        } else {
            setPriceSort([])
        }

    }, [search]);

    useEffect(() => {
        setProducts([])
        fetchProductByCategory()
    }, [category, size, page, producerSort, priceSort]);

    const fetchProductByCategory = async () => {
        const response = await fetchProductsCategory({
            category: category,
            size: size,
            producer: producerSort,
            price: priceSort,
            page: page
        })
            .then((response) => response)
        const products = response.content
        setLast(response.last)
        setProducts(products)
    }
    return (
        <>
            {
                (renderWhenEmpty || products.length > 0) && (
                    <div className={`rounded drop-shadow h-fit w-full bg-gray-50 p-2 ${heightClass}`}>
                        <div className="flex items-center px-2 py-1">
                            <p className={`text-default_red font-medium text-[24px]`}>{name}</p>
                            <div className="flex items-center justify-end flex-1">
                                {/*<a className="text-blue-500 hover:underline cursor-pointer pr-2">View more</a>*/}
                                {url &&
                                    <a className={`text-blue-500 hover:underline cursor-pointer pr-2`} href={url}>View
                                        more</a>}
                            </div>
                        </div>
                        <div className="h-fit w-full flex flex-wrap items-center justify-start gap-y-6 px-2 pb-2">
                            {
                                products.length === 0
                                    ? <p>No device found</p>
                                    : (
                                        products.map((product, index) => (
                                            <ProductCard key={index} product={product} widthClass={widthClass}/>
                                        ))
                                    )
                            }
                        </div>
                        {
                            pageable && !last && (
                                <div className={`w-full flex items-center justify-center pt-6 pb-4`}>
                                    <button
                                        onClick={() => handleViewMoreClick()}
                                        className={`hover:text-default_blue hover:scale-105 rounded bg-default_background p-1`}>View
                                        more
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    );
};

export default CategoryCard;