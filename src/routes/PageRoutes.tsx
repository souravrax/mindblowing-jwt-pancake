import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../constants";
import Home from "../pages/Home/Home";
import Page from "../outlet/Page";

export default function AppRoutes() {
    return (
        <Route path={ROUTES.BASE_PAGE_PATH} element={<Page />}>
            <Route
                path={ROUTES.HOME_URL}
                element={
                    <Suspense>
                        <Home />
                    </Suspense>
                }
            />
        </Route>
    );
}
