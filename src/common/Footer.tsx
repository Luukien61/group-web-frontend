import {AppInfo, footerContent} from "../description/AppInfo.ts";
import {homePage} from "../url/Urls.ts";

const Footer = () => {
    return (
        <footer className="py-6 bg-gray-50 ">
            <div className="w-full px-4 mx-auto max-w-8xl">
                <div className="grid gap-12 xl:grid-cols-5 xl:gap-18">
                    <div className="col-span-2">
                        <a href="" className="flex mb-5">
                            <img
                                src="/app-icon.jpg"
                                className="mr-3 w-[98px] h-[98px] rounded-[100%]"
                                alt="Flowbite Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                {AppInfo.appName}
                            </span>
                        </a>
                        <p className="max-w-lg mb-3 text-gray-600 dark:text-gray-400">
                            {AppInfo.description}
                        </p>
                    </div>
                    {
                        footerContent.map(item => (
                            <div>
                                <h3 className="mb-6 text-sm font-semibold text-black uppercase dark:text-white">
                                    {item.title}
                                </h3>
                                <ul>
                                    {
                                        item.child.map(child=> (
                                            <li className="mb-4">
                                                <a
                                                    href={child.link}
                                                    className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                                                >
                                                    {child.name}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
                <hr className="my-8 border-black dark:border-gray-700 lg:my-12"/>
                <span className="block text-center text-gray-600">
          © 2024-<span id="currentYear">2024</span>{" "}
                    <a href={homePage}>{AppInfo.appName}</a> is a registered
          trademark. All Rights Reserved.
        </span>
            </div>
        </footer>
    );
};

export default Footer;
