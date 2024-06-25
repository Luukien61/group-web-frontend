import {Banner} from "@/component/CarouselBanner.tsx";
import {adminInstance, instance, mailInstance} from "@/axios/Config.ts";
import {
    authenticatePath,
    carouselPath,
    categoryPath,
    findById,
    loginPath,
    mailPath,
    orderPath,
    producerBasePath,
    productPath,
    quantityPath,
    refreshTokenPath,
    searchPath,
    userPath,
    userResponsePath
} from "@/url/Urls.ts";
import {Category, Producer, Product} from "@/component/CategoryCard.tsx";
import axios from "axios";
import {LoginProps, UserResponse} from "@/page/admin/LoginPage.tsx";

type Props = {
    category: string,
    producer?: string[],
    price?: number[],
    page?: number,
    size: number,
    sort?: string
}
type ParamsProps = {
    category: string,
    producer?: string[],
    minPrice?: number,
    maxPrice?: number,
    page?: number,
    size: number,
    sort?: string
}
export const getCategories = async () => {
    const result = await instance.get(categoryPath)
    return result.data
}
export const fetchCarouselImages = async (): Promise<Banner[]> => {
    try {
        const response = await instance.get(carouselPath)
        return response.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export const postCarouselImages = async (items: Banner[]) => {
    try {
        return await adminInstance.post(carouselPath, items)
            .then(response => response.data)
    } catch (e) {
        handleError(e)
    }
}

export const getProducersByCategory = async (category: string) => {
    try {
        return await instance.get(`${producerBasePath}/${category}`)
            .then(response => response.data)
    } catch (error) {
        console.log(error)
    }
}

export const fetchProductsCategory = async ({category, producer, price, page, size,sort}: Props) => {
    if (!category) return
    try {
        const params: ParamsProps = {category: category, page: page ?? 0, size: size ?? 20, sort: sort ?? "madeTime"};
        if (producer) {
            params.producer = producer;
        }
        if (price && price.length > 0) {
            params.minPrice = price[0] * 1000000;
            if (price.length == 2) {
                params.maxPrice = price[1] * 1000000;
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
        handleError(error)
    }
}

export const searchProductsByName = async (name: string) => {
    try {
        const respone = await instance.get(`${searchPath}/${name}`)
            .then(response => response)
        return respone.data
    } catch (error) {
        handleError(error)
    }
}

export const getProductById = async (id: string) => {
    try {
        return await instance.get(`${findById}/${id}`)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}
type MailVerify = {
    "to": string,
    "subject": string,
    "body": number,
    "message"?: string,
    "footer"?: string
}

function createMailVerification(to: string, body: number, type: EmailType): MailVerify {
    let subject: string
    let message: string
    let footer: string

    switch (type.event) {
        case "order": {
            subject = "Order verification"
            message = "Use this code below to verify your order."
            footer = "If you don't place this order, please ignore this email."
            break
        }
        case "reset-password": {
            subject = "Reset password"
            message = "Use this code below to verify your reset-password request."
            footer = "If that was not yours, please ignore this email."
            break
        }
    }
    return {
        to: to,
        subject: subject,
        body: body,
        message: message,
        footer: footer
    };
}

export type EmailType = {
    event: "order" | 'reset-password'
}

export const sendVerificationMail = async (email: string, code: number, type: EmailType) => {
    const data: MailVerify = createMailVerification(email, code, type)
    try {
        return await mailInstance.post(mailPath, data)
            .then(response => response)
    } catch (error) {
        console.log("Error sending email:", error);
    }
}

export const getUserByEmail = async (user: LoginProps) => {
    try {
        return await instance.post(`${userPath}/email`, user)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const resetUserPassword=async (user:LoginProps)=>{
    try{
        return await instance.post(`${userPath}/reset-password`, user)
            .then(response => response.data)
    }catch(error){
        handleError(error)
    }
}


export const getConnection = async () => {
    try {
        return await instance.get(`${productPath}/home`)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const getProductQuantityByCategory = async (category: string) => {
    try {
        return await instance.get(`${quantityPath}/${category}`)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const postProduct = async (product: Product) => {
    try {
        return await instance.post(productPath, product)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
        console.log("Error posting producer: ", error);
        throw error;
    }
}
export type CustomError = {
    "message": string,
    "statusCode": number,
    "timestamp": string
}
export const postNewCategory = async (category: Category) => {
    try {
        return await adminInstance.post(categoryPath, category)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
        // console.log("Error posting producer: ", error);
        throw error;
    }
}

export const postNewProducer = async (producer: Producer[], category: string) => {
    try {
        return await adminInstance.post(`${producerBasePath}/many/${category}`, producer)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
        throw error;
    }
}

export const updateProduct = async (product: Product, productId: string) => {
    try {
        return await instance.put(`${productPath}/${productId}`, product)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
        throw error;
    }
}

export const deleteProduct = async (id: string) => {
    try {
        return await adminInstance.delete(`${productPath}/${id}`)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
        throw error;
    }
}
export type TokenResponse = {
    access_token: string,
    refresh_token: string,
    token_type: string,
    expires_in: Date
}


export const login = async (loginRequest: LoginProps) => {

    // eslint-disable-next-line no-useless-catch
    try {
        return await instance.post(loginPath, loginRequest)
            .then(response => response.data)
    } catch (error) {
        throw error
    }

}
export const authenticateRequest = async () => {
    try {
        const state = await adminInstance.get(`${authenticatePath}`)
            .then(response => response.status)
        return state === 200;
    } catch (error) {
        // if(axios.isAxiosError(error) && error.response && error.response.status === 401){
        return false
        // }
    }
}


export const refreshTokenRequest = async (refreshToken: string) => {
    try {
        return await instance.post(refreshTokenPath, {
            refreshToken: refreshToken
        })
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const getUserResponseById = async (userId: number) => {
    try {
        const response: UserResponse = await adminInstance.get(`${userResponsePath}/${userId}`)
            .then(response => response.data)
        return response
    } catch (error) {
        handleError(error)
    }
}

export const updateProfile = async (user: UserResponse) => {
    try {
        return await adminInstance.put(`${userResponsePath}/${user.staffID}`, user)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}
export type OrderDetail = {
    "phone": string,
    "email": string,
    "done": boolean,
    "orderId": string,
    "productId": string,
    "time": Date,
    "productName"?: string,
    "category"?: string
}

export const placeOrder = async (orderDetail: OrderDetail) => {
    try {
        return instance.post(orderPath, orderDetail)
            .then(response => response.data.message)
    } catch (error) {
        handleError(error)
    }
}

export const getOrderQuantityByState = async (state: boolean) => {
    try {
        return instance.get(`${orderPath}/quantity`, {
            params: {
                state: state
            }
        })
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const deleteOrderById = async (id: string) => {
    try {
        return await instance.delete(`${orderPath}/${id}`)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const completeOrder = async (id: string) => {
    try {
        return await instance.patch(`${orderPath}/${id}`)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const getAllOrderByState = async (state: boolean) => {
    try {
        return await instance.get(`${orderPath}`, {
            params: {
                state: state
            }
        })
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const getAllOrdersByStateAndDateAfter = async (state: boolean, month: number) => {
    try {
        return await adminInstance.get(`${orderPath}/complete`, {
            params: {
                state: state,
                month: month
            }
        }).then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}


export const getOrdersQuantityByStateAndDateAfter = async (state: boolean, month: number) => {
    try {
        return await adminInstance.get(`${orderPath}/quantity/complete`, {
            params: {
                state: state,
                month: month
            }
        }).then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const getAllUsers = async (role: string) => {
    try {
        return await adminInstance.get(`${userPath}`, {
            params: {
                role: role
            }
        })
            .then(response => response.data)
    } catch (e) {
        handleError(e)
    }
}

export const inActiveUser = async (userId: number) => {
    try {
        return await adminInstance.patch(`${userPath}/inactive/${userId}`)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const insertNewUser = async (user: UserResponse) => {
    try {
        return await adminInstance.post(`${userPath}`, user)
            .then(response => response.data)
    } catch (error) {
        handleError(error)
    }
}

export const ratingProduct=async (productId: string, rate: number)=>{
    try{
        return await instance.post(`${productPath}/rating/${productId}`, {
            rate: rate
        }).then(response => response.data)
    }catch (error) {
        handleError(error)
    }
}

const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
        const customError: Error = error.response.data
        console.error(customError.message)
        return customError.message
    }
}



