import { Loader } from 'src/common/CommonFunctions'
import { lazy } from 'react'

export const ModalsPage = Loader(
    lazy(() => import('src/content/pages/Components/Modals/ModalsIndex'))
);

const ModalsRouter = [
    {
        path: "modals",
        element: <ModalsPage />
    }
]

export default ModalsRouter;