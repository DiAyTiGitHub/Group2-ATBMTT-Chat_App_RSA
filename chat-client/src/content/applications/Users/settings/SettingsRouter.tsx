import { Loader } from 'src/common/CommonFunctions';
import { lazy } from 'react';

const SettingsPage = Loader(
    lazy(() => import('./SettingsIndex'))
);

const SettingsRouter = [
    {
        path: "settings",
        element: <SettingsPage />
    },
];

export default SettingsRouter;