import ComponentsRouter from "./content/pages/Components/ComponentsRouter";
import ManagementRouter from './views/Management/ManagementRouter';
import { Status404Page } from './content/pages/Status/Status404/Status404Router';
import BaseLayoutRouter from './layouts/BaseLayout/BaseLayoutRouter';
import DashboardsRouter from './content/dashboards/DashboardsRouter';
import React from "react";

const routes = [
    ...BaseLayoutRouter,
    ...DashboardsRouter,
    ...ManagementRouter,
    ...ComponentsRouter,
    {

        path: '*',
        element: <Status404Page />
    },
];

export default routes;
