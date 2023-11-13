import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routers';
import DefaultLayout from './layouts';

const App = () => {
  return (
    <>
      <div className="container">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route path={route.path} key={index} element={<route.component />} />
            ))}
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
                />
              );
            })}
          </Routes>
        </React.Suspense>
      </div>
    </>
  );
};

export default App;
