import React, {useCallback, useEffect, useState} from 'react';
import {IoPersonCircleOutline} from "react-icons/io5";
import {RiArrowDropDownLine} from "react-icons/ri";
import {getCategories} from "@/axios/Request.ts";
import {Category} from "@/common/NavMenu.tsx";
import {useCategoryItem} from "@/zustand/AppState.ts";
import {UserResponse} from "@/page/admin/LoginPage.tsx";
import useCurrentUser from "@/hooks/useCurrentUser.ts";
import {Link} from "react-router-dom";

type AdminSidebarProps={
    title: string,
    path: string
}
const adminSideBarItems:AdminSidebarProps[] = [
    {
        title: "Order",
        path: "order"
    },
    {
        title: "Carousel",
        path: "carousel"
    }
]
const AdminSideBar = () => {
    const logggedInUser = useCurrentUser()
    const [sideBarItems, setSideBarItems] = useState<AdminSidebarProps[]>(adminSideBarItems)
    const [currentUser, setCurrentUser] = useState<UserResponse>(logggedInUser)
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
    useEffect(() => {
        setCurrentUser(logggedInUser)
        if(logggedInUser.role?.toLowerCase()==="admin"){
            setSideBarItems(prevState => [...prevState, {title: "Users", path: "users"}])
        }
    }, [logggedInUser]);
    const handleCategoryChange = useCallback(() => {
        setCategoryOpen(prev => !prev)
    }, [])


    return (
        <aside className={`hidden lg:block lg:fixed z-50 w-52 bg-admin_nav_bar_default h-auto text-white overflow-y-visible`}>
            <div className={`overflow-y-auto z-20 max-w-2xs h-[100vh] block sticky top-0 mr-0 p-4 px-6`}>
                <div className={`py-2`}>
                   <Link to={'/admin/profile'}>
                       <IoPersonCircleOutline size={32}/>
                       <h1 className={`mt-2`}>{currentUser.fullName}</h1>
                       <h4 className={`font-light opacity-50`}>{currentUser.role}</h4>
                   </Link>
                </div>
                <hr className={`bg-white`}/>
                <nav className={`mt-6 mb-4`}>
                    <div className={`flex flex-1 w-full items-center justify-between`}>
                        <div className={`w-full *:w-full flex flex-col gap-y-2`}>
                            <div className={`p-2 rounded cursor-pointer hover:bg-admin_nav_bar_secondary`}>
                                <a
                                    href={'/admin'}
                                    className={`w-full h-full`}>
                                    <p>Home</p>
                                </a>
                            </div>
                            {/*category*/}
                            <div onClick={handleCategoryChange}
                                 className={`flex gap-x-1 items-center px-2 rounded py-2 hover:bg-admin_nav_bar_secondary cursor-pointer`}>
                                <p>Category</p>
                                <RiArrowDropDownLine
                                    className={`transform duration-300 ${categoryOpen ? 'rotate-180' : ''}`} size={28}/>
                            </div>
                            <div
                                draggable={false}
                                className={`bg-inherit pl-2 ${categoryOpen ? 'block' : 'hidden'}`}>
                                <ul className={``}>
                                    {
                                        category.map((category, index) => (
                                            <Link className={`w-full cursor-pointer group`}
                                                  key={index}
                                                  to={`/admin/${category.name.toLowerCase()}`}>
                                                <li className={`px-2 py-2 group-hover:bg-admin_nav_bar_secondary rounded`}>
                                                    {category.name}
                                                </li>
                                            </Link>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/*Orders*/}
                            {
                                sideBarItems.map((item, index) => (
                                    <div key={index} className={`hover:bg-admin_nav_bar_secondary py-2 px-2 rounded`}>
                                        <Link to={`/admin/${item.path}`}
                                              className={`cursor-pointer `}>
                                            <p>
                                                {item.title}
                                            </p>
                                        </Link>
                                    </div>
                                ))
                            }
                            {/*<div className={`hover:bg-admin_nav_bar_secondary py-2 px-2 rounded`}>*/}
                            {/*    <Link to={'/admin/carousel'}*/}
                            {/*       className={`cursor-pointer`}>*/}
                            {/*        <p>*/}
                            {/*            Carousel*/}
                            {/*        </p>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AdminSideBar;