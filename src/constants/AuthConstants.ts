export const ROUTES = {
    BASE_URL: "/",
    BASE_AUTH_URL: "/auth",
    BASE_APP_PATH: "/app",
    get LOGIN_URL() {
        return `${this.BASE_AUTH_URL}/login`;
    },
    get SIGNUP_URL() {
        return `${this.BASE_AUTH_URL}/create-account`;
    },
    get DEFAULT_PAGE_URL() {
        return `${this.BASE_APP_PATH}/users`;
    },
    get USERS_URL() {
        return `${this.BASE_APP_PATH}/users`;
    },
    get FORGOT_PASSWORD() {
        return "/auth/create-account";
    },
};

export const API_URL = {
    REFRESH_TOKEN_URL: "/auth/token",
    LOGIN_URL: "/auth/login",
    LOGOUT_URL: "/auth/logout",
    CREATE_USER_URL: "/auth/create-user",
    GET_USER_URL: "/api/user",
    GET_USERS_URL: "/api/users",
};
