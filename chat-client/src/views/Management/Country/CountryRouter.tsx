import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';

export const CountryPage = Loader(
    lazy(() => import('src/views/Management/Country/CountryIndex'))
);

const CountryRouter = [
    {
        path: "country",
        element: <CountryPage />
    }
];

export default CountryRouter;