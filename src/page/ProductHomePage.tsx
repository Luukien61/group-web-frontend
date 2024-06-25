import React from 'react';
import Header from "@/common/Header.tsx";
import Footer from "@/common/Footer.tsx";
import ProductPage from "@/page/ProductPage.tsx";

const ProductHomePage = () => {
    return (
        <div>
            <div className={`relative`}>
                <Header/>
                <div className="w-1200 relative overflow-y-visible flex px-4 mx-auto ">
                    <ProductPage/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ProductHomePage;