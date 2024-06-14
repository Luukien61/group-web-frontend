import React, {useEffect} from 'react';
import ProductInfo from "@/component/admin/ProductInfo.tsx";

const AdminAddProductPage = () => {
    useEffect(() => {
        document.title = "New Product";
    }, []);
    return (
        <div>
            <ProductInfo product={null}/>
        </div>
    );
};

export default AdminAddProductPage;