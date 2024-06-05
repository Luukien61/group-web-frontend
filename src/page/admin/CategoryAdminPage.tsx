import React, {useEffect, useState} from 'react';
import {Producer} from "@/common/NavMenu.tsx";
import {fetchProductsCategory, getProducersByCategory} from "@/axios/Request.ts";
import useProductSearch from "@/hooks/useProductSearch.ts";
import {DefaultInput} from "@/component/Input.tsx";
import AdminProductCard from "@/component/admin/AdminProductCard.tsx";
import {Product} from "@/component/CategoryCard.tsx";

type Props = {
    category: string
}

const CategoryAdminPage: React.FC<Props> = ({category}) => {
    const [producers, setProducers] = useState<Producer[]>([])
    const [product, setProduct]=useState<Product[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const {products, handleChange } = useProductSearch();
    useEffect(() => {
        console.log("Product:",products)
    }, [products]);
    useEffect(() => {
        const getProducers = async ()=>{
            const response : Producer[] = await getProducersByCategory(category)
            setProducers(response)
        }
        getProducers()
    },[category])
    useEffect(() => {
        setProduct(products)
        if(!products){
            setProduct(allProducts)
        }
    }, [products]);
    const fetchProps={
        category: category,
        page: 0,
        size: 30
    }
    useEffect(() => {
        const fetchAllProduct=async ()=>{
            const response = await fetchProductsCategory(fetchProps)
            const products= response.content
            setProduct(products)
            setAllProducts(products)
        }
        fetchAllProduct()

    }, []);
    return (
        <div className={`flex flex-col  w-full `}>
            {/*head filter*/}
            <div className={`flex fixed w-full h-20 z-20 shadow-2xl bg-outer_green rounded p-2 pt-0`}>
                {/*producer*/}
                <div className={`flex w-full items-center`}>
                    <div
                        className={`w-1/2 flex fixed overflow-auto`}>
                        {
                            producers.map((producer, index) => (
                                <div key={index}
                                     className={`font-medium hover:bg-third_green cursor-pointer rounded m-0 py-1 px-4`}>
                                    <p className={`font-semibold `}>{producer.name}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`w-1/3 fixed end-0`}>
                        <div className={`flex justify-center items-center`}>
                            <DefaultInput className={`rounded-xl`} onChange={handleChange}
                                          placeholder={'Search productions here...'}/>
                        </div>
                    </div>
                </div>
                {/*search*/}

            </div>
            {/*content*/}
            <div className={`w-[1200px] relative top-20 self-center py-6`}>
                <div className={`w-full shadow flex flex-wrap bg-white rounded p-4`}>
                    {
                        product.map((value, index) => (
                            <AdminProductCard key={index} product={value} />
                        ))
                    }
                </div>
            </div>

        </div>
    );
};

export default CategoryAdminPage;