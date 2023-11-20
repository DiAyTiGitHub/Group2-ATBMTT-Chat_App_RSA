import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';

export const BadgesPage = Loader(
    lazy(() => import('src/content/pages/Components/Badges/BadgesIndex'))
);

const BadgesRouter = [
    {
        path: "badges",
        element: <BadgesPage/>,
    },
];

export default BadgesRouter;