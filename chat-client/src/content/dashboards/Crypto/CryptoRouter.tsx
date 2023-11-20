import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';
import { Navigate } from 'react-router-dom'; // Add this line

export const CryptoPage = Loader(lazy(() => import('./CryptoIndex')));

const CryptoRouter = [
    {
        path: '',
        element: <Navigate to="crypto" replace />
    },
    {
        path: "crypto",
        element: <CryptoPage />,
    },
];

export default CryptoRouter;