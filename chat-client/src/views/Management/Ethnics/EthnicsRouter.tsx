import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';

export const EthnicsPage = Loader(
    lazy(() => import('src/views/Management/Ethnics/EthnicsIndex'))
);

const EthnicsRouter = [
    {
        path: "Ethnics",
        element: <EthnicsPage />
    }
];

export default EthnicsRouter;