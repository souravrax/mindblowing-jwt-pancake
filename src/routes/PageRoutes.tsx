import React from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../constants";
import Suspense from "../components/Suspense/Suspense";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Page = React.lazy(() => import("../outlet/Page"));
const MyAccount = React.lazy(() => import("../pages/MyAccount/MyAccount"));

export default function AppRoutes() {
    return (
        <Route
            path={ROUTES.BASE_PAGE_PATH}
            element={
                <Suspense>
                    <Page />
                </Suspense>
            }
        >
            <Route
                path={ROUTES.HOME_URL}
                element={
                    <Suspense>
                        <Home />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.MY_ACCOUNT}
                element={
                    <Suspense>
                        <MyAccount />
                    </Suspense>
                }
            />
        </Route>
    );
}
