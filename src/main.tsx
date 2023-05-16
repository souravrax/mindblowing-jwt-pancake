import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, DarkTheme, BaseProvider } from "baseui";
import { HashRouter } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import { SnackbarProvider } from "baseui/snackbar";
import { ToasterContainer } from "baseui/toast";
import { useLocalStorage } from "usehooks-ts";
import Routes from "./routes/Routes";

const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Users = React.lazy(() => import("./pages/Home/Home"));

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
                                <Routes toggleTheme={toggleTheme} />
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
