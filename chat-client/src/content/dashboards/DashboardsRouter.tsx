import SidebarLayout from 'src/layouts/SidebarLayout/SidebarLayoutIndex';
import CryptoRouter from "./Crypto/CryptoRouter";
import MessengerRouter from '../applications/Messenger/MessengerRouter';

const DashboardsRouter = [
    {
        path: "dashboards",
        element: <SidebarLayout />,
        children: [
            ...CryptoRouter,
            ...MessengerRouter
        ]
    },
];

export default DashboardsRouter;