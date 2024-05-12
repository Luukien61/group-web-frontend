import React from 'react';
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";
import {useLocationStore} from "@/zustand/AppState.ts";
import {links} from "@/description/MenuLink.tsx";


const SideBarFilter = () => {
    const {pathname, setPathname} = useLocationStore()
    console.log("current location is ",pathname)
    const deviceType = links.find((value, index)=>value.name.toLowerCase()===pathname)
    return (
        <div className="flex items-center space-x-2 sticky col-span-3 mx-3">
            {
                deviceType?.sublinks.map((link, index)=>(
                    <div key={index}
                         className="flex flex-col py-2 px-2 items-start space-x-2"
                    >
                        <h1 className={`font-semibold`}>
                            {link.Head}
                        </h1>
                        <div className={`flex flex-wrap gap-x-1`}>
                            <Checkbox id="terms2"/>
                            <label
                                htmlFor="terms2"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Producer
                            </label>
                        </div>

                    </div>
                ))
            }
        </div>
    );
};

export default SideBarFilter;