import React, {ChangeEvent, useRef, useState} from 'react';
import {DefaultInput} from "@/component/Input.tsx";
import ProductSearch from "@/component/ProductSearch.tsx";
import {Product} from "@/component/CategoryCard.tsx";
import {debounce} from "lodash";
import {searchProductsByName} from "@/axios/Request.ts";
import {IoMdNotificationsOutline} from "react-icons/io";
import {IoPersonCircleOutline} from "react-icons/io5";

type HeaderItem = {
    title: string,
    icon?: React.ReactNode
}

const AdminHeader = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const debouncedHandleSearching = useRef(debounce(
        async (value: string) => {
            const response = await searchProductsByName(value)
            setProducts(response)
        }, 500)).current;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedHandleSearching(event.target.value);
    };
    const menuItems: HeaderItem[] = [
        {
            title: "Notification",
            icon: <IoMdNotificationsOutline size={28}/>,
        },
        {
            title: "Profile",
            icon: <IoPersonCircleOutline size={28}/>,
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
                                className={`absolute inset-0 calc(100% + 4px) space-y-3 rounded bg-default_background h-fit p-2 drop-shadow-2xl ${products.length > 0 ? 'block' : 'hidden'}`}>
                                {
                                    products.map((item, index) => (
                                        <>
                                            <ProductSearch product={item}/>
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
                                 className={`flex text-default_gray flex-col items-center justify-center hover:text-default_blue gap-x-1 group`}>
                                <div className={`relative w-fit`}>
                                    {
                                        item.title.toLowerCase() === "notification" &&
                                        <div
                                            className={`rounded-[100%] group-hover:font-semibold group-hover:bg-default_red flex text-[14px] items-center justify-center text-white bg-red-600 w-[20px] aspect-square absolute -top-1 -right-[6px]`}>
                                            <p>2</p>
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