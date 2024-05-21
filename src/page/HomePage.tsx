import React, {useEffect, useState} from 'react';
import CategoryCard, {Product} from "../component/CategoryCard.tsx";
import CarouselBanner, {Banner} from "@/component/CarouselBanner.tsx";
import {instance} from "@/axios/Config.ts";
type CategoryProps={
    category: string,
    page?: number,
    size?: number
}
const fetchCarouselImages = async (): Promise<Banner[]> => {
    try {
        const response = await instance.get("/carousel")
        return response.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export const fetchProductsCategory = async ({category,page,size}: CategoryProps) => {
    try {
        const response = await instance.get("/product", {
            params: {
                category: category,
                page: page ?? 0,
                size: size ?? 20,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const HomePage = () => {
    const [imageSource, setImageSource] = useState<Banner[]>([])
    const [phone, setPhone] = useState<Product[]>([])

    useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchCarouselImages();
            setImageSource(images)
        }
        const fetchProductByCategory= async ()=>{
            const phone =  await fetchProductsCategory({category: "phone", size: 10})
                .then((response) => response.content)
            setPhone(phone)
        }
        fetchImages()
        fetchProductByCategory()
    }, []);
    return (
        <main className="flex-auto bg-opacity-50 pt-4 space-y-3 w-full min-w-0 static max-h-full overflow-visible ">
            <CarouselBanner imgSource={imageSource}/>
            <CategoryCard name={"Smartphone"} product={phone}/>
            <CategoryCard name={"Laptop"} product={phone}/>
        </main>
    );
};

export default HomePage;