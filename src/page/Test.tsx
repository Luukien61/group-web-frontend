import React, {useEffect} from 'react';
// import {useLoginState, useProduct} from "@/zustand/AppState.ts";
// import {deleteProduct} from "@/axios/Request.ts";

const Test = () => {
    // const {product} = useProduct()
    // const {isLogin} = useLoginState()
    // const handleDelete = async ()=>{
    //      await deleteProduct("iphone-17")
    // }
    useEffect(() => {
        document.title="Test"
    }, []);
    return (
        <div className={`w-1/3 p-4`}>
           <input className={`w-full border rounded outline-none px-3 focus:blue-growing-border`}/>
        </div>
    );
};

export default Test;