
import {Route, Routes} from "react-router-dom";
import App from "../common/App.tsx";
import Layout2 from "../layout2/Layout2.tsx";

const AppRouter = () => {
 return (
     <Routes>
         <Route path="/" element={<App/>} />
         <Route path='/test' element={<Layout2/>}/>
     </Routes>
 );
};

export default AppRouter;