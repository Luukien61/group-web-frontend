import {IoIosLaptop} from "react-icons/io";
import {IoPhonePortraitOutline} from "react-icons/io5";
import React from "react";


type MenuLink = {
    name: string;
    link: string;
    key?: string[] | number[]
}

type SublinkProps = {
    Head: string,
    sublink: MenuLink[]
}
type MenuLinkProps = {
    name: string;
    icon?: React.ReactNode;
    submenu: boolean;
    sublinks: SublinkProps[],
    url: string
}

export const PhoneProducer:MenuLink[]=[
    {name: "Iphone", link: "/"},
    {name: "Samsung", link: "/"},
    {name: "Xiaomi", link: "/"},
    {name: "Oppo", link: "/"},
    {name: "Nokia", link: "/"},
    {name: "Honor", link: "/"},
    {name: "Realme", link: "/"},
    {name: "Google", link: "/"},
    {name: "Vivo", link: "/"},
]

export const laptopProducer:MenuLink[]=[
    {name: "Dell", link: "/"},
    {name: "Hp", link: "/"},
    {name: "Asus", link: "/"},
    {name: "Acer", link: "/"},
    {name: "Lenovo", link: "/"},
    {name: "Apple", link: "/"},
    {name: "MSI", link: "/"},
]

export const phonePrice:MenuLink[] =[
    {name: "Below 2tr", link: "/", key: [0, 2]},
    {name: "From 2tr to 4tr", link: "/", key: [2, 4]},
    {name: "From 4tr to 10tr", link: "/", key: [4, 10]},
    {name: "From 10tr to 15tr", link: "/", key: [10, 15]},
    {name: "Above 15tr", link: "/", key: [15]},
]

export const laptopPrice:MenuLink[] =[
    {name: "Below 6tr", link: "/", key: [0, 6]},
    {name: "From 6tr to 10tr", link: "/", key: [6, 10]},
    {name: "From 10tr to 15tr", link: "/", key: [10, 15]},
    {name: "From 15tr to 20tr", link: "/", key: [15, 20]},
    {name: "Above 20tr", link: "/", key: [15]},
]

export const links: MenuLinkProps[] = [
    {
        name: "Phone",
        icon: <IoPhonePortraitOutline/>,
        submenu: true,
        sublinks: [
            {
                Head: "Producer",
                sublink: [
                    {name: "Iphone", link: "/"},
                    {name: "Samsung", link: "/"},
                    {name: "Xiaomi", link: "/"},
                    {name: "Oppo", link: "/"},
                    {name: "Nokia", link: "/"},
                    {name: "Honor", link: "/"},
                    {name: "Realme", link: "/"},
                    {name: "Google", link: "/"},
                    {name: "Vivo", link: "/"},
                ],
            },
            {
                Head: "Price",
                sublink: [
                    {name: "Below 2tr", link: "/", key: [0, 2]},
                    {name: "From 2tr to 4tr", link: "/", key: [2, 4]},
                    {name: "From 4tr to 10tr", link: "/", key: [4, 10]},
                    {name: "From 10tr to 15tr", link: "/", key: [10, 15]},
                    {name: "Above 15tr", link: "/", key: [15]},
                ],
            },
            {
                Head: "Trending",
                sublink: [
                    {name: "Iphone 15", link: "/"},
                    {name: "Samsung s24", link: "/"},
                    {name: "Google pixel 7", link: "/"},
                    {name: "Xiaomi 14", link: "/"},
                    {name: "Xiaomi 13", link: "/"},
                ],
            },
        ],
        url: 'phone'
    },
    {
        name: "Laptop",
        icon: <IoIosLaptop/>,
        submenu: true,
        sublinks: [
            {
                Head: "Producer",
                sublink: [
                    {name: "Dell", link: "/"},
                    {name: "Hp", link: "/"},
                    {name: "Asus", link: "/"},
                    {name: "Acer", link: "/"},
                    {name: "Lenovo", link: "/"},
                    {name: "Apple", link: "/"},
                    {name: "MSI", link: "/"},
                ],
            },
            {
                Head: "Price",
                sublink: [
                    {name: "Below 6tr", link: "/", key: [0, 6]},
                    {name: "From 6tr to 10tr", link: "/", key: [6, 10]},
                    {name: "From 10tr to 15tr", link: "/", key: [10, 15]},
                    {name: "From 15tr to 20tr", link: "/", key: [15, 20]},
                    {name: "Above 20tr", link: "/", key: [15]},

                ],
            },
            {
                Head: "Trending",
                sublink: [
                    {name: "Mac Air m1", link: "/"},
                    {name: "Vivobook 1", link: "/"},
                    {name: "abc", link: "/"},
                    {name: "xyz", link: "/"},
                ],
            },
        ],
        url: "laptop"
    },
];
