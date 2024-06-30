import React, {useEffect, useState} from 'react';
import {DefaultInput} from "@/component/Input.tsx";
import ProductSearch from "@/component/ProductSearch.tsx";
import {Product} from "@/component/CategoryCard.tsx";
import {IoMdNotificationsOutline} from "react-icons/io";
import {IoLogOutOutline} from "react-icons/io5";
import useProductSearch from "@/hooks/useProductSearch.ts";
import {useLoginState, useOrderPending} from "@/zustand/AppState.ts";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/page/admin/LoginPage.tsx";
import {logOutRequest} from "@/axios/Request.ts";

type HeaderItem = {
    title: string,
    icon?: React.ReactNode,
    action?: ()=>void
}

const AdminHeader = () => {
    const {orderPending}=useOrderPending()
    const { setIsLogin} = useLoginState()
    const navigate= useNavigate()
    const [productSearch, setProductSearch] = useState<Product[]>([]);
    const { products, handleChange } = useProductSearch()
    useEffect(() => {
        setProductSearch(products)
    }, [products]);

    const handleLogOut=async ()=>{
        await logOut()
        localStorage.clear()
        setIsLogin(false)
        navigate('/login')
    }
    const logOut =async ()=>{
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if(accessToken && refreshToken){
            await logOutRequest({accessToken, refreshToken});
        }
    }

    const handleNotificationClick=()=>{
        navigate('/admin/order')
    }

    const menuItems: HeaderItem[] = [
        {
            title: "Notification",
            icon: <IoMdNotificationsOutline size={28}/>,
            action: handleNotificationClick
        },
        {
            title: "Log out",
            icon: <IoLogOutOutline size={28}/>,
            action: handleLogOut
        }
    ]
    return (
        <div className={`w-full sticky top-0 flex items-center px-3 drop-shadow-2xl h-16 bg-default_background`}>
            {/*Search*/}
            <div className='relative flex flex-col mx-2'>
                <DefaultInput className={`!bg-search_background rounded-2xl`} onChange={handleChange}
                              placeholder={'Search productions here...'}/>
                {
                    products && (
                        <div className={`relative mt-1 z-[100]`}>
                            <div
                                className={`absolute inset-0 space-y-3 rounded bg-default_background h-96 overflow-y-auto p-2 drop-shadow-2xl ${products.length > 0 ? 'block' : 'hidden'}`}>
                                {
                                    productSearch.map((item, index) => (
                                        <>
                                            <ProductSearch
                                                path={'/admin'}
                                                product={item}/>
                                            {index < products.length - 1 && <hr/>}
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={`flex-1 flex gap-x-6 justify-end `}>
                <div className={`w-1/2 flex items-center justify-evenly cursor-pointer `}>
                    {
                        menuItems.map((item) => (
                            <div key={item.title}
                                 onClick={item.action}
                                 className={`flex text-default_gray flex-col items-center justify-center hover:text-default_blue gap-x-1 group`}>
                                <div className={`relative w-fit`}>
                                    {
                                        item.title.toLowerCase() === "notification" &&
                                        <div
                                            className={`rounded-[100%] group-hover:font-semibold group-hover:bg-default_red flex text-[14px] items-center justify-center text-white bg-red-600 w-[20px] aspect-square absolute -top-1 -right-[6px]`}>
                                            <p>{orderPending}</p>
                                        </div>
                                    }
                                    <>{item.icon}</>
                                </div>
                                <p>{item.title}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;