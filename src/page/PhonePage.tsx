import React, {useEffect} from 'react';
import SideBarFilter from "@/component/SideBarFilter.tsx";
import {useLocation} from "react-router-dom";
import {useLocationStore} from "@/zustand/AppState.ts";

const PhonePage = () => {
    const location : string = useLocation().pathname.slice(1);
    const {pathname, setPathname} = useLocationStore();
    useEffect(() => {
        console.log(location);
        setPathname(location);
    }, [location]);
    return (
        <div className={`grid-cols-12 gap-x-2 w-full `}>
            <SideBarFilter/>
        </div>
    );
};

export default PhonePage;