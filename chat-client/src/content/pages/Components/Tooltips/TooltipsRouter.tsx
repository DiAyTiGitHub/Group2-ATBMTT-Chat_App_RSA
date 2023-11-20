import { Loader } from 'src/common/CommonFunctions'
import { lazy } from 'react'

export const TooltipsPage = Loader(
    lazy(() => import('src/content/pages/Components/Tooltips/TooltipsIndex'))
);

const TooltipsRouter = [
    {
        path: "tooltips",
        element: <TooltipsPage />
    }
]

export default TooltipsRouter;