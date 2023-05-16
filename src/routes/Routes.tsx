import React from "react";
import { Route, Navigate, Routes as ReactRouterRoutes } from "react-router-dom";
import { ROUTES } from "../constants";
import App from "../outlet/App";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";

export default function Routes({ toggleTheme }: { toggleTheme: () => void }) {
    return (
        <ReactRouterRoutes>
            <Route
                path={ROUTES.BASE_URL}
                element={<App onToggle={toggleTheme} />}
            >
                {AuthRoutes()}
                {AppRoutes()}
                <Route
                    path="/"
                    element={<Navigate to={ROUTES.LOGIN_URL} replace />}
                />
            </Route>
            <Route
                path="*"
                element={<Navigate to={ROUTES.LOGIN_URL} replace />}
            />
        </ReactRouterRoutes>
    );
}
