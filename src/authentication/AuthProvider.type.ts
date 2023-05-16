export type AuthProviderType = {
    refreshToken: () => Promise<boolean>;
    accessToken: string;
    isUserLoggedIn: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
    createUser: (
        name: string,
        username: string,
        password: string
    ) => Promise<boolean>;
};
