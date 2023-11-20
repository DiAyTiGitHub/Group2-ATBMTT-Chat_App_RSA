import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';

export const MaintenancePage = Loader(lazy(() => import('./MaintenanceIndex')));

const MaintenanceRouter = [
    {
        path: "maintenance",
        element: <MaintenancePage />,
    },
];

export default MaintenanceRouter;