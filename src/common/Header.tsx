import {headerImage, homePage, myOrders} from "../url/Urls.ts";
import {CgProfile} from "react-icons/cg";
import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import Input from "../component/Input.tsx";
import {FiShoppingCart} from "react-icons/fi";
import NavMenu from "./NavMenu.tsx";
import {searchProductsByName} from "@/axios/Request.ts";
import {Product} from "@/component/CategoryCard.tsx";
import {debounce} from "lodash";
import ProductSearch from "@/component/ProductSearch.tsx";
import {AppInfo} from "@/description/AppInfo.ts";
import {getMyOrdersLocal} from "@/page/MyOrder.tsx";
import {useNavigate} from "react-router-dom";


export type MenuItem = {
    label: string;
    url?: string;
    key: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
};

function getItem(
    label: string,
    url: string,
    key: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        label,
        url,
        key,
        icon,
        children,
    } as MenuItem;
}

const headerItems: MenuItem[] = [
    getItem("Cart", myOrders, "cart", <FiShoppingCart size={24}/>),
    getItem("Profile", homePage, "profile", <CgProfile size={24}/>)
];

const Header = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [order, setOrder] = useState<number>(0);
    const debouncedHandleSearching = useRef(debounce(
        async (value: string) => {
            const response = await searchProductsByName(value)
            setProducts(response)
        }, 500)).current;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedHandleSearching(event.target.value);
    };
    useEffect(() => {
        const myOrders = getMyOrdersLocal()
        if (myOrders.length) {
            setOrder(myOrders.length)
        }
    }, []);

    return (
        <header className="sticky top-0 z-40  w-full bg-white border-b border-gray-200">
            <div className=" flex flex-col">
                <div className="px-8 mx-0 flex items-center w-full h-16 gap-3">
                    <div>
                        <a
                            href="/"
                            target="_self"
                            className="mr-3 flex-none overflow-hidden w-auto flex items-center gap-2"
                        >
                            <img
                                src="/app-icon.jpg"
                                alt="App Home page"
                                className="object-cover w-[45%] rounded-[100%] "
                            />
                            <p className="text-black font-semibold">{AppInfo.appName}</p>
                        </a>
                    </div>
                    <div className='relative flex flex-1 flex-col'>
                        <div className={`flex justify-evenly`}>
                            <Input className={`border rounded-xl w-full`}
                                   onChange={handleChange}
                                   placeholder={'Search here...'}/>
                            <div className={`w-fit flex justify-center`}>
                                <img className={`max-h-[64px]`} src={headerImage} alt={'Home Sale'}/>
                            </div>
                        </div>
                        {
                            products && (
                                <div className={`relative w-2/3 ml-10 mt-1 z-[100]`}>
                                    <div
                                        className={`absolute inset-0 max-h-96 overflow-y-auto space-y-3 rounded bg-default_background h-fit p-2 drop-shadow-2xl ${products.length > 0 ? 'block' : 'hidden'}`}>
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
                    <div className={`flex items-center`}>
                        {/*account field*/}
                        <div className="flex flex-row  items-center justify-end">
                            <nav className="text-sm leading-6">
                                <ul className="md:flex md:gap-4 hidden space-x-8 text-gray-600">
                                    {headerItems.map((item) => (
                                        <li
                                            key={item.key}
                                        >
                                            <a href={item.url}
                                               className={`relative mx-2 cursor-pointer hover:text-green-600 hover:scale-110 flex flex-col items-center`}>
                                                {item.icon}
                                                {item.label}
                                                {
                                                    item.key == "cart" && order > 0 &&
                                                    <div
                                                        className={`rounded-[100%] group-hover:font-semibold group-hover:bg-default_red flex text-[14px] items-center justify-center text-white bg-red-600 w-[15px] h-[15px] aspect-square absolute -top-1 -right-[6px]`}>
                                                        <p className={`font-medium`}>{order}</p>
                                                    </div>
                                                }
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <hr className="border-black "/>
                <NavMenu/>
            </div>
        </header>
    );
};

export default Header;