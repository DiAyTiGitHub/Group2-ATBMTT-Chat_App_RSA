import SidebarLayout from 'src/layouts/SidebarLayout/SidebarLayoutIndex';
import CountryRouter from "./Country/CountryRouter";
import TransactionsRouter from 'src/content/applications/Transactions/TransactionRouter';
import UserRouter from 'src/content/applications/Users/UsersRouter';
import EthnicsRouter from './Ethnics/EthnicsRouter';

const ManagementRouter = [
    {
        path: "management",
        element: <SidebarLayout />,
        children: [
            ...TransactionsRouter,
            ...CountryRouter,
            ...EthnicsRouter,
            ...UserRouter
        ]
    },
];

export default ManagementRouter;