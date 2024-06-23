import React, {useEffect} from 'react';
import DashboardItem from "@/component/admin/DashboardItem.tsx";
import {useCategoryItem} from "@/zustand/AppState.ts";
import {Category} from "@/common/NavMenu.tsx";

const AdminDashboard = () => {
    const {categoriesItem} = useCategoryItem()
    useEffect(() => {

    }, []);
    return (
        <div className={`flex flex-col w-1/2 border-r border-black `}>
            {/*product category*/}
            <div className={`w-full flex flex-wrap py-5`}>
                {
                    categoriesItem.map((item: Category) => (
                        <DashboardItem key={item.id} category={item }/>
                    ))
                }
            </div>

        </div>
    );
};

export default AdminDashboard;