import React from 'react';
const HomePage = React.lazy(() => import("../pages/HomePage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/RegisterPage"));

const publicRoutes = [
  { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
];
const privateRoutes = [{ path: "/", component: HomePage }];

export { privateRoutes, publicRoutes };