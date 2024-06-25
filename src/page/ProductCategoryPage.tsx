import React, {useEffect} from 'react';
import SideBarFilter from "@/component/SideBarFilter.tsx";
import {useLocation} from "react-router-dom";
import {useLocationStore} from "@/zustand/AppState.ts";
import DeviceList from "@/component/DeviceList.tsx";
import Header from "@/common/Header.tsx";
import Footer from "@/common/Footer.tsx";

const ProductCategoryPage = () => {
    //const [currentLocation, setCurrentLocation] = useState<string>("");
    const location : string = useLocation().pathname.slice(1);
    const path =location.split("/")[0]
    const {setPathname} = useLocationStore();
    useEffect(() => {
        setPathname(path);
    }, [path]);
    useEffect(() => {
        document.title="Categories";
    }, []);
    return (
        <div>
            <div className={`relative w-full`}>
                <Header/>
                <div className="w-1200 flex px-4 mx-auto ">
                    <div className={`py-4 grid grid-cols-11 w-full `}>
                        <SideBarFilter/>
                        <DeviceList/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

)
    ;
};

export default ProductCategoryPage;