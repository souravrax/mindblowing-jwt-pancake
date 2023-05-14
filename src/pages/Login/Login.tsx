import React, { useState } from "react";
import { Button } from "baseui/button";
import { DisplayLarge } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Auth/useAuth";
import AuthContainerCard from "../../components/AuthContainerCard";
import { StyledAction, StyledBody } from "baseui/card";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const { login, isUserLoggedIn } = useAuth();
    const navigate = useNavigate();
    const loginHandler = async () => {
        if (await login(username, password)) {
            navigate("/users", { replace: true });
        }
    };

    return (
        <AuthContainerCard>
            <DisplayLarge>Login</DisplayLarge>
            <StyledBody>
                <FormControl label={() => "Username"} htmlFor={undefined}>
                    <Input
                        placeholder="imawesome"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </FormControl>
                <FormControl label={() => "password"} htmlFor={undefined}>
                    <Input
                        placeholder="my@we$0mePassw0rD"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                    />
                </FormControl>
            </StyledBody>
            <StyledAction>
                <Button
                    onClick={loginHandler}
                    overrides={{
                        BaseButton: {
                            style: {
                                width: "100%",
                            },
                        },
                    }}
                >
                    Login
                </Button>
            </StyledAction>
        </AuthContainerCard>
    );
};

export default Login;
