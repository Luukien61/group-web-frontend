import React from 'react';
import {chip, productionProp, ram, rom, screen} from "../component/ProductCard.tsx";
import CategoryCard from "../component/CategoryCard.tsx";
import CarouselBanner, {Banner} from "@/component/CarouselBanner.tsx";

export const iphone15: productionProp = {
    name: "IPhone 15",
    price: 0,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY8C-7tniV-DL0OMg3t-34bCL3mBjjW4VyAX1rWHGdZA&s",
    category: "smartphone",
    features: [
        {...chip, property: "A15 bionic"},
        {...ram, property: 8},
        {...rom, property: 256},
        {...screen, property: 6.8}
    ]
}
const imgSource: Banner[] = [
    {
        img: "https://i.pinimg.com/736x/85/9d/c7/859dc77032e375f8c24dce78e99e7e9b.jpg",
        url: "/",
        title: "Xiaomi 14"
    },

    {
        img: "https://i.pinimg.com/736x/27/d7/95/27d795bb221203dc23f7c5c0d8453f94.jpg",
        url: "/",
        title: "Samsung s24"
    },

    {
        img: "https://i.pinimg.com/564x/f1/aa/b9/f1aab9b047c06609a531377003c5b740.jpg",
        url: "/",
        title: "Google pixel"
    },
    {
        img: "https://i.pinimg.com/564x/43/8c/c5/438cc57c07f6835e52b9dc69319d427b.jpg",
        url: "/",
        title: "Xiaomi 14"
    },
    {
        img: "https://i.pinimg.com/736x/41/c6/4a/41c64a61fc1e8c0f43f8c298db8135cf.jpg",
        url: "/",
        title: "Samsung Zflip"
    }
]

const HomePage = () => {
    const numbers = Array.from({length: 100}, (_, i) => i + 1);
    return (
        <main className="flex-auto bg-opacity-50 pt-4 space-y-3 w-full min-w-0 static max-h-full overflow-visible ">
            <CarouselBanner imgSource={imgSource}/>
            <CategoryCard name={"Smartphone"}/>

            <div className="flex-auto max-w-4xl min-w-0 pt-6 lg:px-8 lg:pt-6 pb:12 xl:pb-24 lg:pb-16">
                {numbers.map(item => {
                    return (
                        <p className="font-semibold ">This is a line</p>
                    )
                })}
            </div>
        </main>
    );
};

export default HomePage;