
import ChatIndex from './components/Chat/ChatIndex';
import FriendsIndex from './components/Friends/FriendsIndex';
import AccountIndex from './components/Account/AccountIndex';
import AuthIndex from './components/Auth/AuthIndex';
import ChatV2Index from './components/ChatV2/ChatV2Index';

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
    {
        path: '/chat-v2',
        element: <ChatV2Index />
    },
];

export default routes;
