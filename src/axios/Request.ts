import {Banner} from "@/component/CarouselBanner.tsx";
import {instance} from "@/axios/Config.ts";
import {categoryPath, productPath, searchPath} from "@/url/Urls.ts";

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
export const linksCategory = async () => {
    const result = await instance.get(categoryPath)
    return result.data
}
export const fetchCarouselImages = async (): Promise<Banner[]> => {
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

export const searchProdutsByName = async (name: string)=>{
    try{
        const respone= await instance.get(`${searchPath}/${name}`)
            .then(response => response)
        return respone.data
    }catch (error){
        console.error("Error fetching products:", error);
    }
}
