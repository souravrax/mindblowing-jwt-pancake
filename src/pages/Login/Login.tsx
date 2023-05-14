import React, { useState } from "react";
import { Button } from "baseui/button";
import {
    DisplayLarge,
    ParagraphMedium,
    ParagraphSmall,
    ParagraphXSmall,
} from "baseui/typography";
import { FormControl, StyledCaption } from "baseui/form-control";
import { Input } from "baseui/input";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Auth/useAuth";
import AuthContainerCard from "../../components/AuthContainerCard";
import { StyledAction, StyledBody } from "baseui/card";
import { ROUTES } from "../../constants";
import { useStyletron } from "baseui";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, isUserLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [css, theme] = useStyletron();
    const loginHandler = async () => {
        setLoading(true);
        if (await login(username, password)) {
            navigate(ROUTES.LOGIN_URL, { replace: true });
        }
        setLoading(false);
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
                <ParagraphXSmall>
                    <Link
                        to={ROUTES.FORGOT_PASSWORD}
                        style={{ color: theme.colors.accent }}
                    >
                        Forgot Password?
                    </Link>
                </ParagraphXSmall>
            </StyledBody>
            <StyledAction>
                <Button
                    onClick={loginHandler}
                    isLoading={loading}
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
            <StyledCaption>
                <ParagraphSmall>
                    {`Don't have an account?`}
                    <Link
                        to={ROUTES.SIGNUP_URL}
                        style={{
                            color: theme.colors.accent,
                        }}
                    >
                        {" "}
                        Click Here
                    </Link>
                </ParagraphSmall>
            </StyledCaption>
        </AuthContainerCard>
    );
};

export default Login;
