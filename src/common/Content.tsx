import React from 'react';
import ProductCard, {chip, productionProp, ram, rom, screen} from "../component/ProductCard.tsx";
import CategoryCard from "../component/CategoryCard.tsx";
import {homeBackgroundimg} from '../url/Urls.ts'
import CarouselBanner from "@/component/CarouselBanner.tsx";

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
const Content = () => {
    const numbers = Array.from({length: 100}, (_, i) => i + 1);
    return (
        <main className="flex-auto  bg-opacity-50  pt-4 w-full min-w-0 static max-h-full overflow-visible ">
            <CarouselBanner/>
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

export default Content;