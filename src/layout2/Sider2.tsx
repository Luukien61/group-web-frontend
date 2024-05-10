import { getItem } from './Header2.tsx';
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart as ECommerce,
  AiOutlineMessage,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { MdProductionQuantityLimits as Products } from "react-icons/md";
import { IoIosLogIn as Login } from "react-icons/io";
import { useCallback, useState } from "react";

const siderMenuItems = [
  getItem(
    "Dashboard",
    "#",
    "dashboard",
    <AiOutlineDashboard fill="#0542fa" className="stroke-2" />
  ),
  getItem("Inbox", "#", "inbox", <AiOutlineMessage />),
  getItem("E-Commerce", "#", "ecommerce", <ECommerce />, [
    getItem("Billing", "#", "billing"),
    getItem("Invoice", "#", "invoice"),
  ]),
  getItem("Users", "#", "users", <AiOutlineUsergroupAdd />),
  getItem("Products", "#", "products", <Products />),
  getItem("Log In", "#", "logIn", <Login />),
];
const Sider2 = () => {
  const [commerceOpen, setCommerceOpen] = useState<boolean>(false);
  const handleCommerceClick = useCallback(() => {
    setCommerceOpen((pre) => !pre);
  }, []);
  return (
    <aside className="fixed bg-gray-100 ps-4 inset-0 z-20 flex-none hidden h-full w-72 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-48 lg:block">
      <div className="overflow-y-auto z-20 h-full scrolling-touch max-w-2xs lg:h-[calc(100vh-3rem)] lg:block lg:sticky top-12 lg:mr-0">
        <nav className="pt-16 px-1 pl-3 lg:pl-0 lg:pt-2 font-semibold text-base lg:text-sm pb-10 lg:pb-20 sticky?lg:h-(screen-18)">
          <ul className="space-y-4">
            {siderMenuItems.map((item) => {
              if (item.children === undefined) {
                return (
                  <li
                    key={item.key}
                    className="block ps-2 text-black h-8 md:h-10 hover:bg-gray-50 rounded"
                  >
                    <a
                      href={item.url}
                      className="flex gap-2 w-full h-full items-center justify-start"
                    >
                      {item.icon && item.icon}
                      <p className="flex-1">{item.label}</p>
                    </a>
                  </li>
                );
              } else {
                return (
                  <li
                    key={item.key}
                    className="block text-black rounded h-fit ps-2 hover:bg-gray-50"
                  >
                    <button
                      onClick={handleCommerceClick}
                      type="button"
                      className=" flex gap-2 w-full h-8 md:h-10 items-center justify-start"
                    >
                      {item.icon && item.icon}
                      {item.label}
                    </button>
                    <ul
                      className={`bg-gray-100 space-y-2 rounded text-[16px] ease-in-out duration-500 transform block  ${
                        !commerceOpen && "hidden"
                      }`}
                    >
                      {item.children.map((child) => {
                        return (
                          <li
                            key={child.key}
                            className="block text-black h-8 md:h-10 px-3 hover:bg-gray-50 rounded"
                          >
                            <a
                              href={child.url}
                              className="flex gap-2 w-full h-full items-center px-2 justify-start"
                            >
                              {child.icon && child.icon}
                              <p className="flex-1">{child.label}</p>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
export default Sider2;
