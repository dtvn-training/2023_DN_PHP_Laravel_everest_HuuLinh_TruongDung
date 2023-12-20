import React from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routers";
import DefaultLayout from "./layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <React.Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={<route.component />}
              />
            ))}
            {privateRoutes.map((route) => {
              const Layout = DefaultLayout || route.layout;
              const Page = route.component;
              return (
                <Route
                  path={route.path}
                  key={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </React.Suspense>
      </div>
  );
};

export default App;
