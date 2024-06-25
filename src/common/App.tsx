import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";

const App = () => {
    return (
        <div>
            <div className={`relative`}>
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