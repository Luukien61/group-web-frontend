import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import React from "react";

const App = () => {
    return (
        <div>
            <div className={`relative`}>
                <Toaster toastOptions={
                    {
                        duration: 1500
                    }
                }/>
                <Header/>
                <div className={`w-full relative`}>
                    <div className="w-[1200px] flex px-4 mx-auto max-w-7xl "
                        // style={{
                        //     backgroundImage: `url(${homeBackgroundimg})`,
                        //     backgroundSize: '100% 100%',
                        //     backgroundRepeat: 'no-repeat',
                        // }}
                    >
                        <Outlet/>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
};

export default App;