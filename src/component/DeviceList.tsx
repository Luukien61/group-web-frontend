import React from 'react';
import CategoryCard from "@/component/CategoryCard.tsx";
import {useLocationStore} from "@/zustand/AppState.ts";

const DeviceList = () => {
    const {pathname} = useLocationStore()
    const category = pathname.charAt(0).toUpperCase() + pathname.slice(1)
    return (
        <div className={`col-span-10 pl-4 w-full`}>
            <CategoryCard name={category} category={category} initialSize={12} pageable={true} />
        </div>
    );
};

export default DeviceList;