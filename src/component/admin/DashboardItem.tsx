import React from 'react';
import {useCategoryItem} from "@/zustand/AppState.ts";
import {Category} from "@/common/NavMenu.tsx";
type Props = {
    category: Category;
}
const DashboardItem : React.FC<Props>= ({category}) => {
    const {categoriesItem} = useCategoryItem()
    return (
        <div className={`aspect-square w-1/2`}>
            <div className={`px-2 w-full`}>
                <div className={`bg-white flex flex-col rounded-xl aspect-square w-[90%] shadow-xl`}>
                    <p>{category.name}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardItem;