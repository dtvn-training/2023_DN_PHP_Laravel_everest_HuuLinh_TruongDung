import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routers";
import DefaultLayout from "./layouts";

const App = () => {
  return (
    <>
      <div className="container">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route path={route.path} key={index} element={<Page />} />;
          })}
          {privateRoutes.map((route, index) => {
            const Layout = DefaultLayout || route.layout;
            const Page = route.component;
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </>
  );
};

export default App;
