import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';
import { Navigate } from "react-router";

export const Overview = Loader(lazy(() => import('src/content/overview/OverviewIndex')));

const OverviewRouter = [
    {
        path: 'overview',
        element: <Overview />,
    },
];

export default OverviewRouter;