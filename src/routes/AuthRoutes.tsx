import React from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../constants";
import Suspense from "../components/Suspense/Suspense";

const AuthOutlet = React.lazy(() => import("../outlet/Auth"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const SignUp = React.lazy(() => import("../pages/SignUp/SignUp"));

export default function AuthRoutes() {
    return (
        <Route
            path="/auth"
            element={
                <Suspense>
                    <AuthOutlet />
                </Suspense>
            }
        >
            <Route
                path={ROUTES.LOGIN_URL}
                element={
                    <Suspense>
                        <Login />
                    </Suspense>
                }
            />

            <Route
                path={ROUTES.SIGNUP_URL}
                element={
                    <Suspense>
                        <SignUp />
                    </Suspense>
                }
            />
        </Route>
    );
}
