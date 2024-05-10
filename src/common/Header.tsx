import {homePage} from "../url/Urls.ts";
import {CgProfile} from "react-icons/cg";
import React, {useCallback, useState} from "react";
import Input from "../component/Input.tsx";
import {FiShoppingCart} from "react-icons/fi";
import {IoCameraOutline, IoPhonePortraitOutline} from "react-icons/io5";
import {IoIosLaptop, IoIosTabletPortrait} from "react-icons/io";
import {productionProps, productionType} from "../description/AppInfo.ts";
import {links} from "../description/MenuLink.tsx";
import NavMenu from "./NavMenu.tsx";


export type MenuItem = {
    label: string;
    url: string;
    key: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
};

export function getItem(
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
    const [activeHeaderItem, setActiveHeaderItem] = useState<string>("cart");
    const [categoryHover, setCategoryHover] = useState<string | null>()

    const handleHeaderItemClick = useCallback((key: string) => {
        setActiveHeaderItem(key);
    }, []);
    const [itemHover, setItemHover] = useState<productionProps | undefined>()

    const handleHoverItem = (key: string | null) => {
        setCategoryHover(key)
        if (key) {
            const result = productionType.find(value => value.type === key)
            setItemHover(result)
        }
    }

    const category: MenuItem[] = [
        getItem("Smartphone", homePage, "smartphone", <IoPhonePortraitOutline/>),
        getItem("Laptop", homePage, "laptop", <IoIosLaptop/>),
        getItem("Camera", homePage, "camera", <IoCameraOutline/>),
        getItem("Tablet", homePage, "tablet", <IoIosTabletPortrait/>)
    ]
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
                        <div className=''>
                            <Input placeholder={'Search productions here...'}/>
                        </div>
                        <div className="flex flex-row flex-1 items-center justify-end">
                            <nav className="text-sm leading-6">
                                <ul className="md:flex md:gap-4 hidden space-x-8 text-gray-600">
                                    {headerItems.map((item) => (
                                        <li
                                            onClick={() => handleHeaderItemClick(item.key)}
                                            key={item.key}
                                            className={`mx-2 cursor-pointer hover:text-green-600 hover:scale-110 flex flex-col items-center ${
                                                activeHeaderItem === item.key && "text-default_green"
                                            }`}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <hr className="border-black "/>
                    <NavMenu/>

                    {/*--> drop down menu*/}

                </div>
            </header>
        </>
    )
        ;
};

export default Header;