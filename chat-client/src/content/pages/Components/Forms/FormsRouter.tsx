import { Loader } from 'src/common/CommonFunctions'
import { lazy } from 'react'

export const FormsPage = Loader(
    lazy(() => import('src/content/pages/Components/Forms/FormsIndex'))
);

const FormsRouter = [
    {
        path: "forms",
        element: <FormsPage />
    }
]

export default FormsRouter;