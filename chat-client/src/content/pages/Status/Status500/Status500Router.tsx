import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';

export const Status500Page = Loader(lazy(() => import('./Status500Index')));

const Status500Router = [
    {
        path: "500",
        element: <Status500Page />,
    },
];

export default Status500Router;