import React, { CSSProperties, useEffect, useState } from "react";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem,
} from "baseui/header-navigation";
import { useSnackbar } from "baseui/snackbar";
import { Button, SIZE } from "baseui/button";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import { DisplayLarge, DisplayMedium, HeadingSmall } from "baseui/typography";
import { useStyletron } from "baseui";
import { StyledAppContainer } from "../styles/Global.styles";
import { ROUTES } from "../constants";
import BulbSvg from "../Assets/BulbSvg";
import GithubLogo from "../Assets/GithubLogo";

type AppProps = {
    onToggle: () => void;
};

export default function App({ onToggle }: AppProps) {
    const [loggedIn, setLoggedIn] = useState(false);
    const { logout, isUserLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { enqueue } = useSnackbar();

    const [css, theme] = useStyletron();

    const logoutHandler = async () => {
        if (await logout()) {
            navigate(ROUTES.LOGIN_URL, { replace: true });
        } else {
            enqueue({
                message: "No User Logged In",
            });
        }
    };

    useEffect(() => {
        (async () => {
            setLoggedIn(await isUserLoggedIn());
        })();
    }, []);

    return (
        <StyledAppContainer
            className={css({
                background: theme.colors.backgroundPrimary,
            })}
        >
            <div
                className={css({
                    position: "fixed",
                    right: "8px",
                    bottom: "8px",
                })}
            >
                <Button onClick={onToggle}>
                    <BulbSvg
                        height="24px"
                        width="24px"
                        color={theme.colors.buttonSecondaryActive}
                    />
                </Button>
            </div>
            {/* <a
                href="https://github.com/souravrax/mindblowing-jwt-pancake"
                target="_blank"
                rel="noreferrer"
            >
                <GithubLogo />
            </a> */}
            <Outlet />
        </StyledAppContainer>
    );
}
