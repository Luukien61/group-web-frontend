import React from 'react';
import {Checkbox} from "@/shadcn/ui/checkbox.tsx";

const SideBarFilter = () => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id="terms2"/>
            <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Accept terms and conditions
            </label>
        </div>
    );
};

export default SideBarFilter;