import React, {useEffect} from 'react';
import {useLoginState, useProduct} from "@/zustand/AppState.ts";
import {deleteProduct} from "@/axios/Request.ts";
import OrderCard from "@/component/admin/OrderCard.tsx";

const Test = () => {
    const {product} = useProduct()
    const {isLogin} = useLoginState()
    const handleDelete = async ()=>{
         await deleteProduct("iphone-17")
    }
    useEffect(() => {
        document.title="Test"
    }, []);
    return (
        <OrderCard/>
    );
};

export default Test;