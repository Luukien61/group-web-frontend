import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {homeBackgroundimg} from "../url/Urls.ts";
import {Outlet} from "react-router-dom";

const App = () => {
    return (
        <div>
            <div>
                <Header/>
                <div className="w-full flex px-4 mx-auto max-w-8xl "
                     style={{
                         backgroundImage: `url(${homeBackgroundimg})`,
                         backgroundSize: '100% 100%',
                         backgroundRepeat: 'no-repeat',
                     }}
                >
                    <Outlet/>
                </div>

            </div>
            <Footer/>
        </div>
    );
};

export default App;