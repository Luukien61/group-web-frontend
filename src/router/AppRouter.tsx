import {Route, Routes} from "react-router-dom";
import App from "../common/App.tsx";
import HomePage from "@/page/HomePage.tsx";
import ProductCategoryPage from "@/page/ProductCategoryPage.tsx";
import ProductPage from "@/page/ProductPage.tsx";
import LoginPage from "@/page/LoginPage.tsx";
import AdminHome from "@/page/admin/AdminHome.tsx";
import {useEffect, useState} from "react";
import {Category} from "@/common/NavMenu.tsx";
import {useCategory} from "@/zustand/AppState.ts";
import {linksCategory} from "@/axios/Request.ts";


const AppRouter = () => {
    const {categories, setCategories} = useCategory()
    const [category, setCategory] = useState<string[]>([])
    useEffect(() => {
        const fetchCategory = async () => {
            const category: Category[] = await linksCategory();
            const categoryLower = category.map(item => item.name.toLowerCase());
            setCategories(categoryLower)
            setCategory(categoryLower)
        }
        fetchCategory()
    }, []);

    return (
        <Routes>
            {/*customer*/}
            <Route path="/" element={<App/>}>
                <Route index element={<HomePage/>}/>
                {
                    category.map((value, index) => (
                        <Route key={index} path={`${value}/filter`} element={<ProductCategoryPage/>}/>
                    ))
                }
                {
                    categories.map((value, index) => (
                        <Route key={index} path={`${value}/*`} element={<ProductPage/>}/>
                    ))
                }
            </Route>
            {/*login*/}
            <Route path={'/login'} element={<LoginPage/>}/>
            {/*admin*/}
            <Route path={'/admin'} element={<AdminHome/>}/>
        </Routes>
    );
};

export default AppRouter;