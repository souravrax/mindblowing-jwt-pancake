import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import AuthOutlet from "../outlet/Auth";
import { ROUTES } from "../constants";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

export default function AuthRoutes() {
    return (
        <Route path="/auth" element={<AuthOutlet />}>
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
