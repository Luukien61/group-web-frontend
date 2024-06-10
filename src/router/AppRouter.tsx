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
import {getCategories} from "@/axios/Request.ts";
import CategoryAdminPage from "@/page/admin/CategoryAdminPage.tsx";
import AdminMainContent from "@/component/admin/AdminMainContent.tsx";
import AdminAddProductPage from "@/page/admin/AdminAddProductPage.tsx";
import ProductDetail from "@/page/admin/ProductDetail.tsx";
import Redirect from "@/page/Redirect.tsx";


const AppRouter = () => {
    const {categories, setCategories} = useCategory()
    const [category, setCategory] = useState<string[]>([])
    useEffect(() => {
        const fetchCategory = async () => {
            const category: Category[] = await getCategories();
            const categoryLower = category.map(item => item.name.toLowerCase());
            setCategories(categoryLower)
            setCategory(categoryLower)
        }
        fetchCategory()
    }, []);

    return (
        <Routes>
            <Route path={'/test'} element={<AdminAddProductPage/>}/>

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
            <Route path='admin' element={<AdminHome/>}>
                <Route index element={<AdminMainContent/>}/>
                {category.map((value, index) => (
                    <Route key={index} path={`${value}/new`} element={<AdminAddProductPage/>}/>
                ))}

                {
                    category.map((value, index) => (
                        <>
                            <Route key={index} path={`${value}`} element={<CategoryAdminPage category={value}/>}/>
                            <Route key={index} path={`${value}/:productId`} element={<ProductDetail/>}/>
                            <Route key={index} path={`${value}/`} element={<Redirect to={`/admin/${value}`}/>}/>
                        </>
                    ))
                }
            </Route>
        </Routes>
    );
};

export default AppRouter;