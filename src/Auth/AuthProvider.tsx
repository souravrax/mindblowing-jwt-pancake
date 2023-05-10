import React, { useEffect, useMemo, useState } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import { tokenManager } from './TokenManager';
import { LOGIN_URL, LOGOUT_URL, REFRESH_TOKEN_URL } from '../constants';
import { useLocation, useNavigate } from 'react-router-dom';

type SuccessfulAuth = {
    accessToken: string;
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const axiosInstance = axios.create({
        withCredentials: true,
        responseType: 'json',
        baseURL: 'http://localhost:3003',
    });

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [blocked, setBlocked] = useState(true);

    const refreshToken = async () => {
        try {
            const response = await axiosInstance.post(REFRESH_TOKEN_URL);
            const accessToken = (response.data as SuccessfulAuth).accessToken;
            console.log('Token Refreshed');
            tokenManager.setToken(accessToken);
            return true;
        } catch (e) {
            console.log('Unable to refresh token', e);
        }
        return false;
    };

    const isUserLoggedIn = async () => {
        return tokenManager.hasToken() || (await refreshToken());
    };

    useEffect(() => {
        const asyncMethod = async () => {
            if (await isUserLoggedIn()) {
                if (pathname.startsWith('/login'))
                    navigate('/users', { replace: true });
            } else {
                navigate('/login', { replace: true });
            }
            setBlocked(false);
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
            tokenManager.setToken(data.accessToken);
            console.log(response.headers);
            console.log(tokenManager.getToken());
            return true;
        } catch (e) {
            console.log('Error Logging In', e);
        }
        return false;
    };

    const logout = async () => {
        try {
            await axiosInstance.delete(LOGOUT_URL);
            tokenManager.removeToken();
            return true;
        } catch (e) {
            console.log('Error Logging Out', e);
        }
        return false;
    };

    const contextValue = useMemo(
        () => ({
            refreshToken,
            isUserLoggedIn,
            login,
            logout,
        }),
        []
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {blocked ? null : children}
            {/* Hello */}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
