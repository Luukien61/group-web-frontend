import React from 'react';
import {useProduct} from "@/zustand/AppState.ts";
import {AddCategory} from "@/page/admin/AdminProductPage.tsx";

const Test = () => {
    const {product} = useProduct()
    return (
        <div>
            <AddCategory/>
           {/*<pre>{JSON.stringify(product, null,2)}</pre>*/}
        </div>
    );
};

export default Test;