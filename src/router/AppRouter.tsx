import {Route, Routes} from "react-router-dom";
import App from "../common/App.tsx";
import HomePage from "@/page/HomePage.tsx";
import ProductCategoryPage from "@/page/ProductCategoryPage.tsx";
import {productCategory} from "@/url/Urls.ts";
import ProductPage from "@/page/ProductPage.tsx";
import LoginPage from "@/page/LoginPage.tsx";
import AdminHome from "@/page/admin/AdminHome.tsx";

const AppRouter = () => {
    return (
        <Routes>
            {/*customer*/}
            <Route path="/" element={<App/>}>
                <Route index element={<HomePage/>}/>
                {
                    productCategory.map((value, index) => (
                        <Route key={index} path={value} element={<ProductCategoryPage/>}/>
                    ))
                }
                {
                    productCategory.map((value, index) => (
                        <Route path={`${value}/*`} element={<ProductPage/>}/>
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