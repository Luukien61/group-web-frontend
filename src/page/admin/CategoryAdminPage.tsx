import React, {useCallback, useEffect, useState} from 'react';
import {Producer} from "@/common/NavMenu.tsx";
import {fetchProductsCategory, getProducersByCategory} from "@/axios/Request.ts";
import useProductSearch from "@/hooks/useProductSearch.ts";
import {DefaultInput} from "@/component/Input.tsx";
import AdminProductCard from "@/component/admin/AdminProductCard.tsx";
import {Product} from "@/component/CategoryCard.tsx";
import {useLocation} from "react-router-dom";

export type ProductPageable = {
    content: Product[],
    pageable: {
        "pageNumber": number,
        "pageSize": number,
        "sort": {
            "empty": boolean,
            "sorted": boolean,
            "unsorted": boolean
        },
        "offset": number,
        "paged": boolean,
        "unpaged": boolean
    },
    "last": boolean,
    "totalPages": number,
    "totalElements": number,
    "first": boolean,
    "size": number,
    "number": number,
    "sort": {
        "empty": boolean,
        "sorted": boolean,
        "unsorted": boolean
    },
    "numberOfElements": number,
    "empty": boolean
}
type FetchProps = {
    category: string,
    page: number,
    size: number
}
const CategoryAdminPage = () => {
    const locations = useLocation().pathname.split("/");
    const category = locations[locations.length - 1];
    const [producers, setProducers] = useState<Producer[]>([])
    const [product, setProduct] = useState<Product[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const {products, handleChange} = useProductSearch();
    const [lastPage, setLastPage] = useState<boolean>(false)
    const fetchProp = {
        category: category,
        page: 0,
        size: 10
    }

    useEffect(() => {
        document.title=`Admin ${category.charAt(0).toUpperCase()+category.substring(1).toLowerCase()}`
    }, [locations]);
    const [fetchProps, setFetchProps] = useState<FetchProps>(fetchProp)
    useEffect(() => {
        const getProducers = async () => {
            const response: Producer[] = await getProducersByCategory(category)
            setProducers(response)
        }
        getProducers()
        setFetchProps(prevState => ({...prevState,category: category}))

    }, [category])
    useEffect(() => {
        products.sort((a, b) => a.name.localeCompare(b.name))
        setProduct(products)
        if (!products) {
            setProduct(allProducts)
        }
    }, [products]);

    const handleProducerClick=async (producer: string)=>{
        const productPageable : ProductPageable = await fetchProductsCategory({
            category: category,
            producer : [producer],
            size: 20
        })
        setProduct(productPageable.content)
    }

    useEffect(() => {
        const fetchAllProduct = async () => {
            const response: ProductPageable = await fetchProductsCategory(fetchProps)
            const products = response.content
            products.sort((a, b) => a.name.localeCompare(b.name))
            const last = response.last
            setLastPage(last)
            setProduct(products)
            setAllProducts(products)
        }
        fetchAllProduct()
    }, [fetchProps]);
    const handleLoadMoreClick = useCallback(() => {
        setFetchProps(prevState => ({...prevState, size: prevState.size + 10}))
    }, [])
    return (
        <div className={`flex flex-col w-full `}>
            {/*head filter*/}
            <div className={`flex fixed w-full h-20 z-20 shadow-xl bg-white rounded p-2 pt-0`}>
                {/*producer*/}
                <div className={`flex w-full items-center`}>
                    <div
                        className={`w-1/2 flex fixed overflow-auto`}>
                        {
                            producers.map((producer, index) => (
                                <div key={index}
                                     onClick={()=>handleProducerClick(producer.name)}
                                     className={`font-medium hover:bg-third_green cursor-pointer rounded m-0 py-1 px-4`}>
                                    <p className={`font-semibold `}>{producer.name}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`w-1/3 fixed end-0`}>
                        <div className={`flex justify-center items-center`}>
                            <DefaultInput className={`rounded-xl border `} onChange={handleChange}
                                          placeholder={'Search productions here...'}/>
                        </div>
                    </div>
                </div>
                {/*search*/}

            </div>
            {/*content*/}
            <div className={`relative top-20 w-full self-center py-6`}>
                <div className={`w-full flex-col shadow flex flex-wrap bg-white rounded p-4`}>
                    {
                        product.length == 0 &&
                        <p className={`text-red-600 font-medium`}>No device found</p>
                    }
                    <div className={`w-full flex flex-wrap `}>
                        {
                            product.map((value, index) => (
                                <AdminProductCard
                                    key={index} product={value}/>
                            ))
                        }
                    </div>
                    {
                        !lastPage &&
                        <div className={`w-full flex items-center  justify-center pt-6 pb-4`}>
                            <button
                                onClick={handleLoadMoreClick}
                                className={`hover:text-default_blue hover:scale-105 rounded bg-gray-200 p-1`}>
                                View more
                            </button>
                        </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default CategoryAdminPage;