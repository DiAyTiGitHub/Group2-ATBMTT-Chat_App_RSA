import { Loader } from "src/common/CommonFunctions";
import { lazy } from 'react';
import { Navigate } from "react-router";

export const LoginPage = Loader(lazy(() => import('./AuthIndex')));

const AuthRouter = [
    {
        path: "/",
        element: <Navigate to="auth" replace />
    },
    {
        path: "auth",
        element: <LoginPage />
    },
];

export default AuthRouter;