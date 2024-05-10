
import {Route, Routes} from "react-router-dom";
import App from "../common/App.tsx";
import Layout2 from "../layout2/Layout2.tsx";
import {Home} from "lucide-react";
import HomePage from "@/page/HomePage.tsx";
import PhonePage from "@/page/PhonePage.tsx";

const AppRouter = () => {
 return (
     <Routes>
         <Route path="/" element={<App/>} >
             <Route index element={<HomePage/>}/>
             <Route path={'/phone'} element={<PhonePage/>}/>
         </Route>

     </Routes>
 );
};

export default AppRouter;