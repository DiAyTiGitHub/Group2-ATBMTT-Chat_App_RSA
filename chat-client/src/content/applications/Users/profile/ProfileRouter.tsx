import { Loader } from 'src/common/CommonFunctions';
import { lazy } from 'react';

const ProfilePage = Loader(
    lazy(() => import('src/content/applications/Users/profile/ProfileIndex'))
);

const ProfileRouter = [
    {
        path: "details",
        element: <ProfilePage />
    },
];

export default ProfileRouter;