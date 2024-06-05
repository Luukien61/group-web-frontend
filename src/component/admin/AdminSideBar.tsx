import React, {useCallback, useEffect, useState} from 'react';
import {IoPersonCircleOutline} from "react-icons/io5";
import {RiArrowDropDownLine} from "react-icons/ri";
import {getCategories} from "@/axios/Request.ts";
import {Category} from "@/common/NavMenu.tsx";
import {useCategoryItem} from "@/zustand/AppState.ts";

const AdminSideBar = () => {
    const [category, setCategory] = useState<Category[]>([])
    const {setCategoriesItem} = useCategoryItem()
    const [categoryOpen, setCategoryOpen] = useState<boolean>(false)
    useEffect(() => {
        const fetchCategory = async () => {
            const response: Category[] = await getCategories()
            setCategory(response)
            setCategoriesItem(response)
        }
        fetchCategory()

    }, []);
    const handleCategoryChange = useCallback(() => {
        setCategoryOpen(prev => !prev)
    }, [])

    return (
        <aside className={`block fixed z-50 w-52 bg-admin_nav_bar_default h-auto text-white overflow-y-visible`}>
            <div className={`overflow-y-auto z-20 max-w-2xs h-[100vh] block sticky top-0 lg:mr-0 p-4`}>
                <div className={`py-2`}>
                    <IoPersonCircleOutline size={32}/>
                    <h1 className={`mt-2`}>User Admin</h1>
                    <h4 className={`font-light opacity-50`}>Manager</h4>
                </div>
                <hr className={`bg-white`}/>
                <nav className={`mt-6 mb-4`}>
                    <div className={`flex flex-1 w-full items-center justify-between`}>
                        <div className={`w-full *:w-full flex flex-col gap-y-2`}>
                            {/*category*/}
                            <div onClick={handleCategoryChange}
                                 className={`flex gap-x-1 items-center px-2 rounded py-2 hover:bg-admin_nav_bar_secondary cursor-pointer`}>
                                <p>Category</p>
                                <RiArrowDropDownLine className={`transform duration-300 ${categoryOpen ? 'rotate-180': ''}`} size={28}/>
                            </div>
                            <div
                                draggable={false}
                                className={`bg-inherit pl-2 ${categoryOpen ? 'block' : 'hidden'}`}>
                                <ul className={``}>
                                    {
                                        category.map((category, index) => (
                                            <a className={`w-full cursor-pointer group`}
                                               key={index}
                                               href={`/admin/category/${category.id}`}>
                                                <li className={`px-2 py-2 group-hover:bg-admin_nav_bar_secondary rounded`}>
                                                    {category.name}
                                                </li>
                                            </a>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/*Orders*/}
                            <div className={`hover:bg-admin_nav_bar_secondary py-2 px-2 rounded`}>
                                <a className={`cursor-pointer `}>
                                    <p>
                                        Order
                                    </p>
                                </a>
                            </div>
                            <div className={`hover:bg-admin_nav_bar_secondary py-2 px-2 rounded`}>
                                <a className={`cursor-pointer`}>
                                    <p>
                                        Setting
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AdminSideBar;