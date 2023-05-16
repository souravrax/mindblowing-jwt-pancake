import { createContext } from "react";
import { AuthProviderType } from "./AuthProvider.type";
const AuthContext = createContext({} as AuthProviderType);

export default AuthContext;
