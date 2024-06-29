import React, {useEffect, useState} from 'react';
import {Product, ProductList} from "@/component/CategoryCard.tsx";
import {MY_ORDER} from "@/page/ProductPage.tsx";
import {getProductByIds} from "@/axios/Request.ts";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const getMyOrdersLocal = (): string[] => {
    const myOrderRaw = localStorage.getItem(MY_ORDER);
    let myOrders: string[] = []
    if (myOrderRaw) {
        myOrders = JSON.parse(myOrderRaw);
    }
    return myOrders
}
const MyOrder = () => {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        const myOrders: string[] = getMyOrdersLocal();
        fetchProductById(myOrders)
        document.title="My orders"
    }, []);
    const fetchProductById = async (id: string[]) => {
        try {
            const product: Product[] = await getProductByIds(id)
            setProducts(product)
        } catch (e) {
            toast.error("An error occurred while fetching data")
        }
    }
    return (
        <div className={`w-full min-h-96 my-4`}>
            <ProductList
                products={products}
                last={true}
                heightClass={`min-h-96`}
                name={"My orders"}
                pageable={false}
                renderWhenEmpty={true}
                handleViewMoreClick={() => {
                }}
                widthClass={"w-1/3"}
            />
        </div>
    );
};

export default MyOrder;