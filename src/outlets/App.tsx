import React from "react";
import { useSnackbar } from "baseui/snackbar";
import { Button } from "baseui/button";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../authentication/useAuth";
import { useStyletron } from "baseui";
import { StyledAppContainer } from "./Outlet.style";
import { ROUTES } from "../constants";
import BulbSvg from "../images/BulbSvg";

type AppProps = {
    onToggle: () => void;
};

export default function App({ onToggle }: AppProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { enqueue } = useSnackbar();

    const [css, theme] = useStyletron();

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
