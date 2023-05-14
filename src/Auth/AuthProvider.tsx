import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { accessTokenManager } from "./TokenManager";
import { API_URL, ROUTES } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";

type SuccessfulAuth = {
    status_code: number;
    access_token: string;
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { CREATE_USER_URL, LOGIN_URL, LOGOUT_URL, REFRESH_TOKEN_URL } =
        API_URL;
    const axiosInstance = axios.create({
        withCredentials: true,
        responseType: "json",
        baseURL: process.env.BASE_URL,
    });

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const refreshToken = async () => {
        try {
            const response = await axiosInstance.post(REFRESH_TOKEN_URL);
            const accessToken = (response.data as SuccessfulAuth).access_token;
            console.log("Token Refreshed");
            accessTokenManager.setToken(accessToken);
            return true;
        } catch (e) {
            console.log("Unable to refresh token", e);
        }
        return false;
    };

    const isUserLoggedIn = async () => {
        return accessTokenManager.hasToken() || (await refreshToken());
    };

    useLayoutEffect(() => {
        const asyncMethod = async () => {
            const userLoggedIn = await isUserLoggedIn();
            const isAuthPage =
                pathname.startsWith(ROUTES.LOGIN_URL) ||
                pathname.startsWith(ROUTES.SIGNUP_URL);
            if (!isAuthPage && !userLoggedIn) {
                navigate(ROUTES.LOGIN_URL, { replace: true });
            } else if (isAuthPage && userLoggedIn) {
                navigate(ROUTES.DEFAULT_PAGE_URL, { replace: true });
            }
        };
        asyncMethod();
    }, [pathname]);

    const login = async (username: string, password: string) => {
        try {
            const response = await axiosInstance.post(LOGIN_URL, {
                username,
                password,
            });
            const data = response.data as SuccessfulAuth;
            accessTokenManager.setToken(data.access_token);
            return true;
        } catch (e) {
            console.log("Error Logging In", e);
        }
        return false;
    };

    const logout = async () => {
        try {
            const response = await axiosInstance.delete(LOGOUT_URL);
            accessTokenManager.removeToken();
            console.log(response.data);
            return true;
        } catch (e) {
            console.log("Error Logging Out", e);
        }
        return false;
    };

    const createUser = async (
        name: string,
        username: string,
        password: string
    ) => {
        try {
            const response = await axiosInstance.post(CREATE_USER_URL, {
                name,
                username,
                password,
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const contextValue = useMemo(
        () => ({
            refreshToken,
            isUserLoggedIn,
            login,
            logout,
            createUser,
        }),
        []
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
