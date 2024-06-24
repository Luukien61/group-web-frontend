import {headerImage, homePage} from "../url/Urls.ts";
import {CgProfile} from "react-icons/cg";
import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import Input from "../component/Input.tsx";
import {FiShoppingCart} from "react-icons/fi";
import NavMenu from "./NavMenu.tsx";
import {searchProductsByName} from "@/axios/Request.ts";
import {Product} from "@/component/CategoryCard.tsx";
import {debounce} from "lodash";
import ProductSearch from "@/component/ProductSearch.tsx";


export type MenuItem = {
    label: string;
    url: string;
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
    getItem("Cart", homePage, "cart", <FiShoppingCart size={24}/>),
    getItem("Profile", homePage, "profile", <CgProfile size={24}/>)
];

const Header = () => {
    const [, setActiveHeaderItem] = useState<string>("cart");
    const [products, setProducts] = useState<Product[]>([]);
    const handleHeaderItemClick = useCallback((key: string) => {
        setActiveHeaderItem(key);
    }, []);
    const debouncedHandleSearching = useRef(debounce(
        async (value: string) => {
            const response = await searchProductsByName(value)
            setProducts(response)
        }, 500)).current;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedHandleSearching(event.target.value);
    };
    return (
        <>
            <header className="sticky top-0 z-40 flex-none w-full mx-auto bg-white border-b border-gray-200">
                <div className=" flex flex-col">
                    <div className="px-3 lg:px-8 lg:mx-0 flex items-center w-full h-16 gap-0 md:gap-3">
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
                                <p className="text-black font-semibold">App</p>
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
                        <div className={`flex items-center`}>
                            {/*account field*/}
                            <div className="flex flex-row  items-center justify-end">
                                <nav className="text-sm leading-6">
                                    <ul className="md:flex md:gap-4 hidden space-x-8 text-gray-600">
                                        {headerItems.map((item) => (
                                            <li
                                                onClick={() => handleHeaderItemClick(item.key)}
                                                key={item.key}
                                                className={`mx-2 cursor-pointer hover:text-green-600 hover:scale-110 flex flex-col items-center`}
                                            >
                                                {item.icon}
                                                {item.label}
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
        </>
    );
};

export default Header;