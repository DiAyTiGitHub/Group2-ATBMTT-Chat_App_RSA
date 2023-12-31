import FriendsIndex from './components/Friends/FriendsIndex';
import AccountIndex from './components/Account/AccountIndex';
import AuthIndex from './components/Auth/AuthIndex';
import ChatV2Index from './components/ChatV2/ChatV2Index';
import UserProfileIndex from './components/UserProfile/UserProfileIndex';

const routes = [
    {
        path: '/friends',
        element: <FriendsIndex />
    },
    {
        path: '/account',
        element: <AccountIndex />
    },
    {
        path: '/user-profile',
        element: <UserProfileIndex />
    },
    {
        path: '/',
        element: <AuthIndex />
    },
    {
        path: '/chat',
        element: <ChatV2Index />
    },
];

export default routes;
