import React, {useEffect, useState} from 'react';
import CategoryCard, {Product} from "../component/CategoryCard.tsx";
import CarouselBanner, {Banner} from "@/component/CarouselBanner.tsx";
import {fetchCarouselImages, fetchProductsCategory} from "@/axios/Request.ts";
import {useCategoryItem} from "@/zustand/AppState.ts";


const HomePage = () => {
    const [imageSource, setImageSource] = useState<Banner[]>([])
    const [, setPhone] = useState<Product[]>([])
    const {categoriesItem} = useCategoryItem()
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
        document.title= "Home"
    }, []);
    return (
        <main className="flex-auto bg-opacity-50 py-4 space-y-3 w-full min-w-0 static max-h-full overflow-visible ">
            <CarouselBanner imgSource={imageSource}/>
            {
                categoriesItem.map((value, index) => (
                    <CategoryCard
                        key={index}
                        name={value.name}
                        url={`/${value.name.toLowerCase()}/filter`}
                        category={`${value.name.toLowerCase()}`}
                        pageable={false}
                        widthClass={`w-1/5`}
                        initialSize={10}/>
                ))
            }
        </main>
    );
};

export default HomePage;