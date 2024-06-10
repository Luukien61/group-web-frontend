import React, {useEffect, useRef, useState} from 'react';
import ProductInfo from "@/component/admin/ProductInfo.tsx";
import {Product} from "@/component/CategoryCard.tsx";
import {useLocation} from "react-router-dom";
import {getProductById} from "@/axios/Request.ts";

const ProductDetail = () => {
    const [product, setProduct] = useState<Product | null>(null)
    const location = useLocation().pathname
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const productId = location.split("/")[3]
    useEffect(() => {
        fetchProduct()
    }, []);
    const fetchProduct = async () => {
        setIsLoading(true)
        const response: Product = await getProductById(productId)
        setProduct(response)
        setIsLoading(false)
        console.log("Product: ", response)
    }
    return (
        <div>
            {isLoading ? (
                <div className={`fixed w-screen h-screen bg-white`}></div>
            ) : (
                <ProductInfo product={product}/> // Hiển thị dữ liệu khi đã tải xong
            )}
        </div>
    );
};

export default ProductDetail;