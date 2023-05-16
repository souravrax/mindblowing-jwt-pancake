import React from "react";
import AuthContext from "./AuthContext";
import { AuthProviderType } from "./AuthProvider.type";
const useAuth = (): AuthProviderType => {
    const context = React.useContext(AuthContext);
    return context;
};

export default useAuth;
