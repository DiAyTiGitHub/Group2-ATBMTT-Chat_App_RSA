import { Loader } from "src/common/CommonFunctions";
import { lazy } from "react";

export const CardsPage = Loader(
    lazy(() => import('src/content/pages/Components/Cards/CardsIndex'))
);

const CardsRouter = [
    {
        path: "cards",
        element: <CardsPage />
    }
]

export default CardsRouter;