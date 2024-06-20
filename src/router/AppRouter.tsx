import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import App from "../common/App.tsx";
import HomePage from "@/page/HomePage.tsx";
import ProductCategoryPage from "@/page/ProductCategoryPage.tsx";
import ProductPage from "@/page/ProductPage.tsx";
import LoginPage from "@/page/LoginPage.tsx";
import AdminHome from "@/page/admin/AdminHome.tsx";
import React, {useEffect} from "react";
import {Category} from "@/common/NavMenu.tsx";
import {useCategory, useCategoryItem} from "@/zustand/AppState.ts";
import {getCategories} from "@/axios/Request.ts";
import CategoryAdminPage from "@/page/admin/CategoryAdminPage.tsx";
import AdminMainContent from "@/component/admin/AdminMainContent.tsx";
import AdminAddProductPage from "@/page/admin/AdminAddProductPage.tsx";
import ProductDetail from "@/page/admin/ProductDetail.tsx";
import Test from "@/page/Test.tsx";
import AdminOrder from "@/page/admin/AdminOrder.tsx";
import AdminCompleteOrder from "@/page/admin/AdminCompleteOrder.tsx";
import NotFoundPage from "@/page/NotFoundPage.tsx";
import AdminCarousel from "@/page/admin/AdminCarousel.tsx";

type CleanProps = {
    children: React.ReactElement | null
}
const CleanUrlMiddleware: React.FC<CleanProps> = ({children}) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        let cleanPathname = pathname.replace(/\/\/+/g, '/')
        if (cleanPathname.endsWith("/")) {
            cleanPathname = cleanPathname.substring(0, cleanPathname.length - 1)
        }
        if (cleanPathname !== pathname) {
            navigate(cleanPathname, {replace: true})
        }
    }, [navigate, pathname]);
    return children
}

const AppRouter = () => {
    const {setCategories} = useCategory()
    const {setCategoriesItem} = useCategoryItem()
    useEffect(() => {
        //setIsLoading(true)
        const fetchCategory = async () => {
            const category: Category[] = await getCategories();
            const categoryLower = category.map(item => item.name.toLowerCase());
            setCategories(categoryLower)
            setCategoriesItem(category)
        }
        fetchCategory()
    }, []);
    return (
        <CleanUrlMiddleware>
            <Routes>
                <Route path={'/regex'} element={<Test/>}/>
                <Route path={'/not-found'} element={<NotFoundPage/>}/>
                {/*customer*/}
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={`:category/filter`} element={<ProductCategoryPage/>}/>
                    <Route path={`:category/:productId`} element={<ProductPage/>}/>
                    <Route path={`*`} element={<NotFoundPage/>}/>
                </Route>
                {/*login*/}
                <Route path={'/login'} element={<LoginPage/>}/>
                {/*admin*/}
                <Route path='/admin' element={<AdminHome/>}>
                    <Route index element={<AdminMainContent/>}/>
                    <Route path='order' element={<AdminOrder/>}/>
                    <Route path='carousel' element={<AdminCarousel/>}/>
                    <Route path='order/complete' element={<AdminCompleteOrder/>}/>
                    <Route path={`new-product`} element={<AdminAddProductPage/>}/>
                    <Route path={`:category/:productId`} element={<ProductDetail/>}/>
                    <Route path={`:category`} element={<CategoryAdminPage/>}/>

                    <Route path={`*`} element={<NotFoundPage/>}/>
                </Route>
                <Route path={`*`} element={<NotFoundPage/>}/>
            </Routes>
        </CleanUrlMiddleware>
    );
};

export default AppRouter;