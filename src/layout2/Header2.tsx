import { homePage } from "../url/Urls.ts";
import { useState, useCallback } from "react";
import { AiOutlineMenu as MenuOpen } from "react-icons/ai";
import { AiOutlineCloseSquare as MenuClose } from "react-icons/ai";
export type MenuItem = {
  label: string;
  url: string;
  key: string;
  icon?: any;
  children?: MenuItem[];
};

export function getItem(
    label: string,
    url: string,
    key: string,
    icon?: any,
    children?: MenuItem[]
): MenuItem {
  return {
    label,
    url,
    key,
    icon,
    children,
  } as MenuItem;
}
const headerItems: MenuItem[] = [
  getItem("Home", homePage, "home"),
  getItem("Setting", homePage, "setting"),
  getItem("Profile", homePage, "profile"),
  getItem("Sign In", homePage, "sign_in"),
];
const Header2 = () => {
  const [activeHeaderItem, setActiveHeaderItem] = useState<string>("home");
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpenClick = useCallback(() => {
    setOpen((pre) => !pre);
    //console.log("is open: ", isOpen)
  }, []);

  const handleHeaderItemClick = useCallback((key: string) => {
    setActiveHeaderItem(key);
  }, []);
  return (
    <header className="sticky top-0 z-40 flex-none w-full mx-auto bg-white border-b border-gray-200">
      <div className="px-3 lg:px-8 lg:mx-0">
        <div className="flex items-center w-full h-12 gap-0 md:gap-3">
          <div>
            <a
              href="/"
              target="_self"
              className="mr-3 flex-none overflow-hidden w-auto flex items-center gap-2"
            >
              <img
                src="/app.png"
                alt="App Home page"
                className="object-cover w-[30%]"
              />
              <p className="text-black font-semibold">App</p>
            </a>
          </div>
          <div className="flex flex-row flex-1 items-center justify-end">
            <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
              <ul className="md:flex md:gap-4 hidden space-x-8 ">
                {headerItems.map((item) => (
                  <li
                    onClick={() => handleHeaderItemClick(item.key)}
                    key={item.key}
                    className={`mx-2 cursor-pointer hover:text-default_blue_button ${
                      activeHeaderItem === item.key && "text-blue-400"
                    }`}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </nav>

            <div onClick={handleOpenClick} className="md:hidden block me-3">
              {isOpen ? <MenuClose size={32} /> : <MenuOpen size={32} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header2;
