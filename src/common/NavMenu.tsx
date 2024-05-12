import React from 'react';
import {links} from "../description/MenuLink.tsx";
import {RiArrowDropDownLine} from "react-icons/ri";
import {Link} from "react-router-dom";

const NavMenu = () => {
    return (
        <ul className="bg-secondary flex gap-x-5 px-7 h-10 items-center justify-start drop-shadow">
            {
                links.map((link, index) => (
                    <div key={index}
                         className=" flex flex-col gap-y-1 group cursor-pointer ">
                        <Link to={link.url}>
                            <h1 className="flex gap-1 items-center text-[16px] font-semibold text-white group-hover:text-default_green">
                                {link.icon}
                                {link.name}
                                <RiArrowDropDownLine size={24}
                                                     className="group-hover:rotate-180 transform duration-300"/>
                            </h1>
                        </Link>
                        <div className="hidden group-hover:block absolute top-6 hover:block">
                            <div className="py-3">
                                <div className="w-6 h-6 left-3 absolute mt-1 bg-default_background rotate-45"></div>
                                <div
                                    className="bg-default_background p-5 grid grid-cols-3 gap-10 px-4 mt-2 cursor-default">
                                    {
                                        link.sublinks.map((sublink, subindex) => (
                                            <div key={subindex} className="flex flex-col gap-3">
                                                <h1 className="font-semibold items-start ">
                                                    {sublink.Head}
                                                </h1>
                                                {
                                                    sublink.sublink.map((item, sublinkIndex) => (
                                                        <Link key={sublinkIndex}
                                                              to={item.link}
                                                              className="cursor-pointer hover:text-default_green">
                                                            {item.name}
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </ul>
    );
};

export default NavMenu;