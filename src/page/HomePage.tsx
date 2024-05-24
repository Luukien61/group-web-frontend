import React, {useEffect, useState} from 'react';
import CategoryCard, {Product} from "../component/CategoryCard.tsx";
import CarouselBanner, {Banner} from "@/component/CarouselBanner.tsx";
import {instance} from "@/axios/Config.ts";
import {productPath} from "@/url/Urls.ts";

type Props = {
    category: string,
    producer?: string[],
    price?: number[],
    page?: number,
    size: number
}
type ParamsProps = {
    category: string,
    producer?: string[],
    minPrice?: number,
    maxPrice?: number,
    page?: number,
    size: number
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

export const fetchProductsCategory = async ({category, producer, price, page, size}: Props) => {
    try {
        const params: ParamsProps = {category: category, page: page ?? 0, size: size ?? 20};
        if (producer) {
            params.producer = producer;
        }
        if (price && price.length > 0) {
            params.minPrice = price[0];
            if (price.length == 2) {
                params.maxPrice = price[1];
            }
        }
        const response = await instance.get(productPath, {
            params,
            paramsSerializer: params => {
                    const result = [];
                    for (const key in params) {
                        if (Array.isArray(params[key])) {
                            params[key].forEach((value: string) => {
                                result.push(`${key}=${value}`);
                            });
                        } else {
                            result.push(`${key}=${params[key]}`);
                        }
                    }
                    return result.join('&');
            }
        });
        return response.data;
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
        const fetchProductByCategory = async () => {
            const phone = await fetchProductsCategory({category: "phone", size: 10})
                .then((response) => response.content)
            setPhone(phone)
        }
        fetchImages()
        fetchProductByCategory()
    }, []);
    return (
        <main className="flex-auto bg-opacity-50 py-4 space-y-3 w-full min-w-0 static max-h-full overflow-visible ">
            <CarouselBanner imgSource={imageSource}/>
            <CategoryCard name={"Smartphone"} url={'/phone'} product={phone}/>
            <CategoryCard name={"Laptop"} url={"/laptop"} product={phone}/>
        </main>
    );
};

export default HomePage;