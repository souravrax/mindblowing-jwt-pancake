import React, { CSSProperties } from "react";
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
import { accessTokenManager } from "../Auth/TokenManager";
import { HeadingSmall } from "baseui/typography";
import { useStyletron } from "baseui";
import {
    StyledAppContainer,
    StyledContentContainer,
} from "../styles/Global.styles";
import { ROUTES } from "../constants";

type AppProps = {
    onToggle: () => void;
};

export default function App({ onToggle }: AppProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { enqueue } = useSnackbar();

    const [css, theme] = useStyletron();

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
        <StyledAppContainer
            className={css({
                background: theme.colors.backgroundPrimary,
                height: "100%",
            })}
        >
            <HeaderNavigation
                overrides={{
                    Root: {
                        style: {
                            backgroundColor: theme.colors.backgroundSecondary,
                            paddingLeft: "32px",
                            paddingRight: "32px",
                        } as CSSProperties,
                    },
                }}
            >
                <StyledNavigationList $align={ALIGN.left}>
                    <StyledNavigationItem>
                        <HeadingSmall>JWT Example (by Sourav)</HeadingSmall>
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.center}>
                    {/* <StyledNavigationItem>
                        <Link to="/users">Users</Link>
                    </StyledNavigationItem> */}
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.right}>
                    <StyledNavigationItem>
                        <Button
                            onClick={onToggle}
                            kind="secondary"
                            shape="pill"
                            size={SIZE.compact}
                        >
                            Toggle Theme
                        </Button>
                    </StyledNavigationItem>
                    {/* <StyledNavigationItem>
                        <Link to={ROUTES.LOGIN_URL}>
                            <Button
                                shape="pill"
                                kind="tertiary"
                                size={SIZE.compact}
                            >
                                Log In
                            </Button>
                        </Link>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <Link to={ROUTES.SIGNUP_URL}>
                            <Button
                                shape="pill"
                                kind="primary"
                                size={SIZE.compact}
                            >
                                Create Account
                            </Button>
                        </Link>
                    </StyledNavigationItem> */}
                    {accessTokenManager.hasToken() && (
                        <StyledNavigationItem>
                            <Button
                                onClick={logoutHandler}
                                size={SIZE.compact}
                                disabled={!accessTokenManager.hasToken()}
                            >
                                Logout
                            </Button>
                        </StyledNavigationItem>
                    )}
                </StyledNavigationList>
            </HeaderNavigation>
            <StyledContentContainer>
                <Outlet />
            </StyledContentContainer>
        </StyledAppContainer>
    );
}
