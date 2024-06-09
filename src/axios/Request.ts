import {Banner} from "@/component/CarouselBanner.tsx";
import {instance, mailInstance} from "@/axios/Config.ts";
import {categoryPath, findById, mailPath, producerBasePath, productPath, quantityPath, searchPath} from "@/url/Urls.ts";
import {Category, Producer, Product} from "@/component/CategoryCard.tsx";

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
export const getCategories = async () => {
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

export const getProducersByCategory = async (category: string) => {
    try{
        return await instance.get(`${producerBasePath}/${category}`)
            .then(response => response.data)
    }catch (error){
        console.log(error)
    }
}

export const fetchProductsCategory = async ({category, producer, price, page, size}: Props) => {
    if (!category) return
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

export const searchProductsByName = async (name: string) => {
    try {
        const respone = await instance.get(`${searchPath}/${name}`)
            .then(response => response)
        return respone.data
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

export const getProductById = async (id: string) => {
    try {
        const response = await instance.get(`${findById}/${id}`)
            .then(response => response)
        return response.data
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
type MailVerify = {
    "to": string,
    "subject": string,
    "body": number
}

function createMailVerification(to: string, body: number, subject: string = "Order verification"): MailVerify {
    return {to: to, subject: subject, body: body};
}

export const sendVerificationMail = async (email: string, code: number) => {
    const data: MailVerify = createMailVerification(email, code)
    try {
        return await mailInstance.post(mailPath, data)
            .then(response => response)
    }catch(error) {
        console.log("Error sending email:", error);
    }
}

export const getConnection=async ()=>{
    try{
        return await instance.get(`${productPath}/home`)
            .then(response=>response.data)
    }
    catch (error){
        console.log("Error getting connection:", error);
        return "Error getting connection"
    }
}

export const getProductQuantityByCategory=async (category: string)=>{
    try{
        return await instance.get(`${quantityPath}/${category}`)
            .then(response => response.data)
    }catch (error){
        console.log(error)
    }
}

export const postProduct = async (product :Product)=>{
    try{
        return await instance.post(productPath, product)
            .then(response => response.data)
    }catch (error){
        console.log("Error posting product:", error);
        throw error;
    }
}

export const postNewCategory = async (category:Category)=>{
    try{
        return await instance.post(categoryPath,category)
        .then(response => response.data)
    }catch (error){
        console.log("Error posting category:", error);
        throw error;
    }
}

export const postNewProducer = async (producer: Producer[], category: string)=>{
    try{
        return await instance.post(`${producerBasePath}/many/${category}`,producer)
            .then(response=>response.data)
    }catch (error){
        console.log("Error posting a new producer:", error);
        throw error;
    }
}
