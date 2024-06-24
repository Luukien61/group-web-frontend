import {ChangeEvent, useRef, useState} from "react";
import {Product} from "@/component/CategoryCard.tsx";
import {debounce} from "lodash";
import {searchProductsByName} from "@/axios/Request.ts";

const useProductSearch = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const debouncedHandleSearching = useRef(debounce(
        async (value: string) => {
            if(value){
                const response = await searchProductsByName(value);
                setProducts(response);
            }
        }, 500)).current;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedHandleSearching(event.target.value);
    };

    return { products, handleChange };
};

export default useProductSearch;