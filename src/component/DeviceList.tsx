import React, {useEffect, useState} from 'react';
import CategoryCard, {Product} from "@/component/CategoryCard.tsx";
import {useFilter, useLocationStore} from "@/zustand/AppState.ts";
import {fetchProductsCategory} from "@/page/HomePage.tsx";

const DeviceList = () => {
    const {pathname} = useLocationStore()
    const category = pathname.charAt(0).toUpperCase() + pathname.slice(1)
    const [product, setProduct] = useState<Product[]>([])
    const {producerFilter,priceFilter} = useFilter()
    useEffect(() => {
        const fetchProductByCategory= async ()=>{
            const phone =  await fetchProductsCategory({category: pathname.trimStart(),producer: producerFilter,price: priceFilter, size: 20})
                .then((response) => response.content)
            setProduct(phone)
        }
        fetchProductByCategory()
    }, [pathname,producerFilter, priceFilter])
    return (
        <div className={`col-span-10 pl-4 w-full`}>
            <CategoryCard name={category} product={product} />
        </div>
    );
};

export default DeviceList;