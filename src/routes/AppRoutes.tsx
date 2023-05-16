import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../constants";
import Users from "../pages/Users/Users";

export default function AppRoutes() {
    return (
        <Route path={ROUTES.BASE_APP_PATH}>
            <Route
                path={ROUTES.USERS_URL}
                element={
                    <Suspense>
                        <Users />
                    </Suspense>
                }
            />
        </Route>
    );
}
