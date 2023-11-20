import SidebarLayout from 'src/layouts/SidebarLayout/SidebarLayoutIndex';
import MessengerRouter from '../applications/Messenger/MessengerRouter';

const DashboardsRouter = [
    {
        path: "dashboards",
        element: <SidebarLayout />,
        children: [
            ...MessengerRouter
        ]
    },
];

export default DashboardsRouter;