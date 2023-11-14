import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const publicRoutes = [
  { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
];
const privateRoutes = [{ path: "/", component: HomePage }];

export { privateRoutes, publicRoutes };
