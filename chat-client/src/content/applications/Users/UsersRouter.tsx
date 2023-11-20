import ProfileRouter from './profile/ProfileRouter';
import SettingsRouter from './settings/SettingsRouter';

const UserRouter = [
    {
        path: "profile",
        children: [
            ...ProfileRouter,
            ...SettingsRouter
        ]
    },
];

export default UserRouter;