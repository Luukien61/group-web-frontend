import React, {useEffect, useState} from 'react';
import CategoryCard, {Product} from "../component/CategoryCard.tsx";
import CarouselBanner, {Banner} from "@/component/CarouselBanner.tsx";
import {fetchCarouselImages, fetchProductsCategory, getConnection} from "@/axios/Request.ts";


const HomePage = () => {
    const [imageSource, setImageSource] = useState<Banner[]>([])
    const [phone, setPhone] = useState<Product[]>([])

    useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchCarouselImages();
            setImageSource(images)
        }
        const fetchProductByCategory = async () => {
            const phone = await fetchProductsCategory({category: "phone", size: 10})
                .then((response) => response.content)
            setPhone(phone)
        }
        fetchImages()
        fetchProductByCategory()
    }, []);
    useEffect(() => {
        const getConnections = async ()=>{
            const response =await getConnection();
            console.log(response)
        }
        getConnections()
        document.title= "Home"
    }, []);
    return (
        <main className="flex-auto bg-opacity-50 py-4 space-y-3 w-full min-w-0 static max-h-full overflow-visible ">
            <CarouselBanner imgSource={imageSource}/>
            <CategoryCard
                name={"Smartphone"}
                url={'/phone/filter'}
                category={"phone"}
                pageable={false}
                widthClass={`w-1/5`}
                initialSize={10}/>
            <CategoryCard
                name={"Laptop"}
                url={"/laptop/filter"}
                category={"laptop"}
                pageable={false}
                widthClass={`w-1/5`}
                initialSize={10}/>
        </main>
    );
};

export default HomePage;