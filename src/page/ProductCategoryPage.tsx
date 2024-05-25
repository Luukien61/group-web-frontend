import React, {useEffect} from 'react';
import SideBarFilter from "@/component/SideBarFilter.tsx";
import {useLocation} from "react-router-dom";
import {useLocationStore} from "@/zustand/AppState.ts";
import DeviceList from "@/component/DeviceList.tsx";

const ProductCategoryPage = () => {
    //const [currentLocation, setCurrentLocation] = useState<string>("");
    const location : string = useLocation().pathname.slice(1);
    const {setPathname} = useLocationStore();
    useEffect(() => {
        setPathname(location);
    }, [location]);
    return (
        <div className={`py-4 grid grid-cols-12 w-full `}>
            <SideBarFilter/>
            <DeviceList/>
        </div>
    );
};

export default ProductCategoryPage;