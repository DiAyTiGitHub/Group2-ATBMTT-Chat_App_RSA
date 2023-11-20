import OverviewRouter from "src/content/overview/OverviewRouter";
import StatusRouter from "src/content/pages/Status/StatusRouter";
import BaseLayout from 'src/layouts/BaseLayout/BaseLayoutIndex';
import AuthRouter from "src/views/Auth/AuthRouter";

const BaseLayoutRouter = [
    {
        path: "",
        element: <BaseLayout/>,
        children: [
            ...AuthRouter,
            ...OverviewRouter,
            ...StatusRouter,
        ]
    },
];

export default BaseLayoutRouter;