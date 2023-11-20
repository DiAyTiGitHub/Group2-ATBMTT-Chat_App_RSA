import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';

export const SidebarLayoutPage = Loader(
    lazy(() => import('src/layouts/SidebarLayout/SidebarLayoutIndex'))
);

const SidebarLayoutRouter = [
    {
        path: "",
        element: <SidebarLayoutPage/>,
    },
];

export default SidebarLayoutRouter;