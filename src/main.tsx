import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./index.css";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, DarkTheme, BaseProvider } from "baseui";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProvider from "./Auth/AuthProvider";
import { SnackbarProvider } from "baseui/snackbar";
import { ToasterContainer } from "baseui/toast";
import { ROUTES } from "./constants";
import { useLocalStorage } from "usehooks-ts";

import Suspense from "./components/Suspense/Suspense";
const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Users = React.lazy(() => import("./pages/Users/Users"));

const engine = new Styletron();

const Root = () => {
    const [darkTheme, setDarkTheme] = useLocalStorage<number>("darkTheme", 0);
    const toggleTheme = () => {
        setDarkTheme((theme) => theme ^ 1);
    };
    return (
        <BaseProvider theme={darkTheme ? DarkTheme : LightTheme}>
            <HashRouter>
                <AuthProvider>
                    <StyletronProvider value={engine}>
                        <SnackbarProvider>
                            <ToasterContainer>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={<App onToggle={toggleTheme} />}
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
                                            path={ROUTES.USERS_URL}
                                            element={
                                                <Suspense>
                                                    <Users />
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
                                        <Route
                                            path="/"
                                            element={
                                                <Navigate
                                                    to={ROUTES.LOGIN_URL}
                                                    replace
                                                />
                                            }
                                        />
                                    </Route>
                                    <Route
                                        path="*"
                                        element={
                                            <Navigate
                                                to={ROUTES.LOGIN_URL}
                                                replace
                                            />
                                        }
                                    />
                                </Routes>
                            </ToasterContainer>
                        </SnackbarProvider>
                    </StyletronProvider>
                </AuthProvider>
            </HashRouter>
        </BaseProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Root />
);
