import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routers";

const App = () => {
  
  return (
    <>
      <div className="container" >
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route path={route.path} key={index} element={<Page />} />;
          })}
          {privateRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route
                    path={route.path}
                    key={index}
                    element={<Page />}
                    
                  ></Route>
                );
              })}
        </Routes>
      </div>
    </>
  );
};

export default App;
