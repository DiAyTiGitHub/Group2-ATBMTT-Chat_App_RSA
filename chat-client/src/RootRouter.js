
import ChatIndex from './components/Chat/ChatIndex';
import FriendsIndex from './components/Friends/FriendsIndex';
import AccountIndex from './components/Account/AccountIndex';
import AuthIndex from './components/Auth/AuthIndex';

const routes = [
    {
        path: '/chat',
        element: <ChatIndex />
    },
    {
        path: '/friends',
        element: <FriendsIndex />
    },
    {
        path: '/account',
        element: <AccountIndex />
    },
    {
        path: '/',
        element: <AuthIndex />
    },
];

export default routes;
