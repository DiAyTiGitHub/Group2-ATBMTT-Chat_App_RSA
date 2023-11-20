import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';

export const ComingSoonPage = Loader(lazy(() => import('./ComingSoonIndex')));

const ComingSoonRouter = [
    {
        path: "coming-soon",
        element: <ComingSoonPage />,
    },
];

export default ComingSoonRouter;