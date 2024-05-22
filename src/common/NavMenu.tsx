import React, {useEffect, useState} from 'react';
import {links} from "../description/MenuLink.tsx";
import {RiArrowDropDownLine} from "react-icons/ri";
import {Link} from "react-router-dom";
import {instance} from "@/axios/Config.ts";
import {categoryPath} from "@/url/Urls.ts";

const linksCategory = async () => {
    const result = await instance.get(categoryPath)
    return result.data
}
type Producer = {
    id: number,
    name: string
}
type Category = {
    "id": number,
    "name": string,
    "producers": Producer[]
}

const NavMenu = () => {
    const [category, setCategory] = useState<Category[]>([])
    useEffect(() => {
        const fetchCategory = async () => {
            const category = await linksCategory();
            setCategory(category)
        }
        fetchCategory()
    }, []);
    return (
        <ul className="bg-secondary flex gap-x-5 px-7 h-10 items-center justify-start drop-shadow">
            {
                category.map((category, index) => (
                    <div key={index}
                         className=" flex flex-col gap-y-1 group cursor-pointer ">
                        <Link to={category.name.toLowerCase()}>
                            <h1 className="flex gap-1 items-center text-[16px] font-semibold text-white group-hover:text-default_green">
                                {category.name}
                                <RiArrowDropDownLine size={24}
                                                     className="group-hover:rotate-180 transform duration-300"/>
                            </h1>
                        </Link>
                        <div className="hidden group-hover:block absolute top-6 hover:block">
                            <div className="py-3">
                                <div className="w-6 h-6 left-3 absolute mt-1 bg-default_background rotate-45"></div>
                                <div
                                    className="bg-default_background p-5 grid grid-cols-3 gap-10 px-4 mt-2 cursor-default">
                                    <div className="flex flex-col gap-3">
                                        <h1 className="font-semibold items-start ">
                                            Producer
                                        </h1>
                                        {
                                            category.producers.map((producer, sublinkIndex) => (
                                                <Link key={sublinkIndex}
                                                      to={`/${category.name.toLowerCase()}/${producer.name.toLowerCase()}`}
                                                      className="cursor-pointer hover:text-default_green">
                                                    {producer.name}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </ul>
    );
};

export default NavMenu;