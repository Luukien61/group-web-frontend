import React, {useEffect} from 'react';
import {useLoginState, useProduct} from "@/zustand/AppState.ts";
import {deleteProduct} from "@/axios/Request.ts";

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
        <div>
            Hello this is test
            <p>{isLogin ? "Logged in" : "Not log in yet"}</p>
            <button onClick={handleDelete}>Delete</button>
           {/*<pre>{JSON.stringify(product, null,2)}</pre>*/}
        </div>
    );
};

export default Test;