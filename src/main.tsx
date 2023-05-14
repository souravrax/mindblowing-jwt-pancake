import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./index.css";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, DarkTheme, BaseProvider } from "baseui";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import AuthProvider from "./Auth/AuthProvider";
import { SnackbarProvider } from "baseui/snackbar";
import SignUp from "./pages/SignUp/SignUp";
import { ToasterContainer } from "baseui/toast";
import { ROUTES } from "./constants";
import { StyledAppContainer } from "./styles/Global.styles";
import { useStyletron } from "baseui";

const engine = new Styletron();

const Root = () => {
    const [darkTheme, setDarkTheme] = useState<number>(0);
    const toggleTheme = () => {
        setDarkTheme((theme) => theme ^ 1);
    };
    const [css, theme] = useStyletron();
    return (
        <BaseProvider theme={darkTheme ? DarkTheme : LightTheme}>
            <BrowserRouter>
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
                                            element={<Login />}
                                        />
                                        <Route
                                            path={ROUTES.USERS_URL}
                                            element={<Users />}
                                        />
                                        <Route
                                            path={ROUTES.SIGNUP_URL}
                                            element={<SignUp />}
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
            </BrowserRouter>
        </BaseProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Root />
);
