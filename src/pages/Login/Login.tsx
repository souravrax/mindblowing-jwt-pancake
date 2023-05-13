import React, { useEffect, useState } from "react";
import { Button } from "baseui/button";
import { DisplayLarge } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { StyledLoginPage } from "./Login.styles";
import { Container } from "../../styles/Global.styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Auth/useAuth";

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
    // useEffect(() => {
    //     const isUserLoggedInAsync = async () => {
    //         if (await isUserLoggedIn()) {
    //             navigate('/users', { replace: true });
    //         }
    //         setLoading(false);
    //     };
    //     isUserLoggedInAsync();
    // }, []);
    return (
        <Container>
            <StyledLoginPage>
                <DisplayLarge>Login</DisplayLarge>
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
                <Button onClick={loginHandler}>Login</Button>
            </StyledLoginPage>
        </Container>
    );
};

export default Login;
