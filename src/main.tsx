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

const engine = new Styletron();

const Root = () => {
    const [theme, _setTheme] = useState<number>(0);
    // const toggleTheme = () => {
    //     setTheme((theme) => theme ^ 1);
    // };
    return (
        <BrowserRouter>
            <AuthProvider>
                <StyletronProvider value={engine}>
                    <BaseProvider theme={theme ? DarkTheme : LightTheme}>
                        <SnackbarProvider>
                            <Routes>
                                <Route path="/" element={<App />}>
                                    <Route path="login" element={<Login />} />
                                    <Route path="users" element={<Users />} />
                                    <Route
                                        path="/"
                                        element={
                                            <Navigate to="/login" replace />
                                        }
                                    />
                                </Route>
                                <Route
                                    path="*"
                                    element={<Navigate to="/login" replace />}
                                />
                            </Routes>
                        </SnackbarProvider>
                    </BaseProvider>
                </StyletronProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Root />
);
