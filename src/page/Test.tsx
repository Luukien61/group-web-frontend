import React from 'react';
import {useProduct} from "@/zustand/AppState.ts";
import {deleteProduct} from "@/axios/Request.ts";

const Test = () => {
    const {product} = useProduct()
    const handleDelete = async ()=>{
         await deleteProduct("iphone-17")
    }
    return (
        <div>
            Hello this is test
            <button onClick={handleDelete}>Delete</button>
           {/*<pre>{JSON.stringify(product, null,2)}</pre>*/}
        </div>
    );
};

export default Test;