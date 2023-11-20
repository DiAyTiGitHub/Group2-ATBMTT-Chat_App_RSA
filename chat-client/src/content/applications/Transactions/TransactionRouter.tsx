import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';
import { Navigate } from "react-router";

export const TransactionsPage = Loader(lazy(() => import('./TransactionsIndex')));

const TransactionsRouter = [
    {
        path: '',
        element: <Navigate to="transactions" replace />
    },
    {
        path: "transactions",
        element: <TransactionsPage />,
    },
];

export default TransactionsRouter;