import React, {useCallback, useEffect, useState} from 'react';
import ProductCard from "./ProductCard.tsx";
import {fetchProductsCategory} from "@/axios/Request.ts";
import {useLocation} from "react-router-dom";
import {debounce} from "lodash";
import {ProductPageable} from "@/page/admin/CategoryAdminPage.tsx";

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
export type ContentChild = {
    id?: number,
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
    const [producerSort, setProducerSort]= useState<string[]>([])
    const [priceSort, setPriceSort] = useState<number[]>([])
    const [products, setProducts] = useState<Product[]>([])
    // const {producerFilter, priceFilter} = useFilter()
    const search = useLocation().search
    const handleViewMoreClick = useCallback(() => {
        setSize(pre => pre + initialSize);
    }, [initialSize]);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchProducts = useCallback(
        debounce((search: string, category: string) => {
            initFetch(search, category)
        }, 200), []
    )
    useEffect(() => {
        debouncedFetchProducts(search, category)
        return () => {
            debouncedFetchProducts.cancel();
        };
    }, [debouncedFetchProducts, search, category]);
    useEffect(() => {
        fetchProductByCategory(producerSort,priceSort,category)
    }, [size]);
    const initFetch = async (search: string, category: string) => {
        const params = search.slice(1).split("&")
        const producersParam = params.filter((value) => value.includes("producer"))
        const priceParams = params.filter((value) => value.includes("price"))
        let producers: string[] = []
        let priceFilter: number[] = []
        if (producersParam.length > 0) {
            const producerList = producersParam[0]
            const equalIndex = producerList.indexOf("=")
            producers = producerList.slice(equalIndex + 1).split(",")
            setProducerSort(producers)
        }
        if (priceParams.length > 0) {
            //[min-price=2000000', 'max-price=4000000]
            priceFilter = priceParams.map((value) => parseInt(value.split("=")[1]))
            setPriceSort(priceFilter)
        }
        await fetchProductByCategory(producers, priceFilter, category)
    }


    const fetchProductByCategory = async (producerFilter: string[], priceFilter: number[], category: string) => {
        const response: ProductPageable = await fetchProductsCategory({
            category: category,
            size: size,
            producer: producerFilter,
            price: priceFilter,
            page: page
        })
            .then((response) => response)
        const products = response.content
        setLast(response.last)
        setProducts(products)
    }
    return (
        <ProductList
            products={products}
            last={last}
            name={name}
            url={url}
            pageable={pageable}
            heightClass={heightClass}
            renderWhenEmpty={renderWhenEmpty}
            handleViewMoreClick={handleViewMoreClick}
            widthClass={widthClass}
        />
    );
};

export default CategoryCard;
type ProductListProps = {
    renderWhenEmpty: boolean;
    heightClass?: string,
    widthClass: string
    name: string,
    url? : string,
    products: Product[],
    pageable: boolean,
    last: boolean
    handleViewMoreClick: ()=>void
}
export const ProductList: React.FC<ProductListProps> =({products,renderWhenEmpty,name, widthClass,url,heightClass, pageable, last, handleViewMoreClick} )=>{
    return(
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
                                        onClick={handleViewMoreClick}
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
    )
}