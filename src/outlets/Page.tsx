import React from "react";
import { useSnackbar } from "baseui/snackbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useStyletron } from "baseui";
import { ROUTES } from "../constants";
import { ChevronDown, Delete, Overflow, Upload } from "baseui/icon";
import { AppNavBar, setItemActive, NavItem } from "baseui/app-nav-bar";
import { StyledPageContainer } from "./Outlet.style";

export default function Page() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { enqueue } = useSnackbar();

    const [css, theme] = useStyletron();
    const { pathname } = useLocation();

    const [mainItems, setMainItems] = React.useState<NavItem[]>([
        {
            icon: Upload,
            label: "Home",
            active: pathname.includes(ROUTES.HOME_URL),
            info: "home",
        },
        { icon: Upload, label: "Videos" },
        {
            icon: ChevronDown,
            label: "Images",
            navExitIcon: Delete,
            children: [
                { icon: Upload, label: "Image 1" },
                { icon: Upload, label: "Image 2" },
                { icon: Upload, label: "Image 3" },
                { icon: Upload, label: "Image 4" },
            ],
        },
    ]);
    const userItems: NavItem[] = [
        { icon: Overflow, label: "My Account", info: "my-account" },
        { icon: Overflow, label: "Logout", info: "logout" },
    ];

    const logoutHandler = async () => {
        if (await logout()) {
            navigate(ROUTES.LOGIN_URL, { replace: true });
            enqueue({
                message: "User Logged Out",
            });
        } else {
            enqueue({
                message: "No User Logged In",
            });
        }
    };
    const onUserItemSelect = (item: NavItem) => {
        switch (item.info) {
            case "logout":
                (async () => await logoutHandler())();
                break;
            case "my-account":
                console.log("firshit");
                navigate(ROUTES.MY_ACCOUNT);
        }
    };

    function handleMainItemSelect(item: NavItem) {
        setMainItems((prev) => setItemActive(prev, item));
        switch (item.info) {
            case "home":
                navigate(ROUTES.HOME_URL);
        }
    }

    return (
        <StyledPageContainer
            className={css({
                background: theme.colors.backgroundPrimary,
            })}
        >
            <AppNavBar
                title="BinarySearch (Reborn)"
                mainItems={mainItems}
                userItems={userItems}
                onMainItemSelect={handleMainItemSelect}
                onUserItemSelect={onUserItemSelect}
                username="Sourav Rakshit"
                usernameSubtitle="Software Development Engineer I"
                userImgUrl="https://i1.wp.com/wilcity.com/wp-content/uploads/2020/06/115-1150152_default-profile-picture-avatar-png-green.jpg?fit=820%2C860&ssl=1"
            />
            <div
                style={{
                    boxSizing: "border-box",
                    padding: "16px 32px",
                }}
            >
                <Outlet />
            </div>
        </StyledPageContainer>
    );
}
