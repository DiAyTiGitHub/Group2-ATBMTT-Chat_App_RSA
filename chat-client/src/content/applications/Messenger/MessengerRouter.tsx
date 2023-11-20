import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';

export const MessengerPage = Loader(lazy(() => import('./MessengerIndex')));

const MessengerRouter = [
    {
        path: "messenger",
        element: <MessengerPage />,
    },
];

export default MessengerRouter;