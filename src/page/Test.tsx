import React from 'react';
import {useProduct} from "@/zustand/AppState.ts";

const Test = () => {
    const {product} = useProduct()
    return (
        <div>
            Hello this is test
           {/*<pre>{JSON.stringify(product, null,2)}</pre>*/}
        </div>
    );
};

export default Test;