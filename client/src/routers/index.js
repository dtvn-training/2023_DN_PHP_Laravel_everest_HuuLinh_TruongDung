import React from "react";
const DashboardPage = React.lazy(() => import("../pages/DashboardPage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const AccountPage = React.lazy(() => import("../pages/AccountPage"));
const CampaignPage = React.lazy(() => import("../pages/CampaignPage"));

const publicRoutes = [{ path: "/login", component: LoginPage }];

const privateRoutes = [
  { path: "/", component: DashboardPage },
  { path: "/account_managemet", component: AccountPage },
  { path: "/campaign_management", component: CampaignPage },
];

export { privateRoutes, publicRoutes };
