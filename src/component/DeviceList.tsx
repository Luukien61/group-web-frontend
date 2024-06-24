import React from 'react';
import CategoryCard from "@/component/CategoryCard.tsx";
import {useLocationStore} from "@/zustand/AppState.ts";

const DeviceList = () => {
    const {pathname} = useLocationStore()
    const category = pathname.charAt(0).toUpperCase() + pathname.slice(1)
    const path =category.split("/")[0]
    return (
        <div className={`col-span-10 pl-4 w-full`}>
            {
                path && (
                    <CategoryCard
                        renderWhenEmpty={true}
                        name={path}
                        heightClass={'min-h-full'}
                        category={path}
                        initialSize={12}
                        widthClass={`w-1/4`}
                        pageable={true} />
                )
            }
        </div>
    );
};

export default DeviceList;