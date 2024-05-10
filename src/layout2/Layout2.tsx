import Content2 from "./Content2";
import Footer2 from "./Footer2";
import Header2 from "./Header2";
import Sider2 from "./Sider2.tsx";

const Layout2 = () => {
  return (
    <div>
      <Header2 />
      <div className="w-full pe-4 mx-auto max-w-8xl">
        <div className="lg:flex">
          <Sider2 />
          <Content2 />
        </div>
        <Footer2/>
      </div>
    </div>
  );
};

export default Layout2;
/* */
