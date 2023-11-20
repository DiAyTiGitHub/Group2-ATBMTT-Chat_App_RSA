import { Loader } from 'src/common/CommonFunctions'
import { lazy } from 'react'

export const AccordionsPage = Loader(
    lazy(() => import('src/content/pages/Components/Accordions/AccordionsIndex'))
);

const AccordionsRouter = [
    {
        path: "accordions",
        element: <AccordionsPage />
    }
];

export default AccordionsRouter;