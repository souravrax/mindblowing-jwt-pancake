import { useState } from "react";

export const useAccessToken = () => {
    const [accessToken, setAccessToken] = useState<string>("");
    const tokenExpiry = Number(process.env.ACCESS_TOKEN_EXPIRY);
    const setToken = (token: string) => {
        setAccessToken(token);
        setTimeout(() => {
            removeAccessToken();
        }, tokenExpiry);
    };
    const removeAccessToken = () => {
        setAccessToken("");
    };
    return { accessToken, setAccessToken: setToken, removeAccessToken };
};
