import React from "react";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem,
} from "baseui/header-navigation";
import { useSnackbar } from "baseui/snackbar";
import { Button, SIZE } from "baseui/button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import { tokenManager } from "../Auth/TokenManager";

// type AppProps = {
//     onToggle: () => void;
// };

export default function App() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { enqueue } = useSnackbar();

    const logoutHandler = async () => {
        if (await logout()) {
            navigate("/login", { replace: true });
        } else {
            enqueue({
                message: "No User Logged In",
            });
        }
    };

    return (
        <>
            <HeaderNavigation>
                <StyledNavigationList $align={ALIGN.left}>
                    <StyledNavigationItem>
                        JWT Example (by Sourav)
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.center}>
                    <StyledNavigationItem>
                        <Link to="/users">Users</Link>
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.right}>
                    {/* <StyledNavigationItem>
                        <Button onClick={onToggle} size={SIZE.compact}>
                            Toggle Theme
                        </Button>
                    </StyledNavigationItem> */}
                    <StyledNavigationItem>
                        <Link to="/login">Login</Link>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <Button
                            onClick={logoutHandler}
                            size={SIZE.compact}
                            disabled={!tokenManager.hasToken()}
                        >
                            Logout
                        </Button>
                    </StyledNavigationItem>
                </StyledNavigationList>
            </HeaderNavigation>
            <Outlet />
        </>
    );
}
