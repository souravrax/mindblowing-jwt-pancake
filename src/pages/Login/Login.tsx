import React, { useState } from "react";
import { Button } from "baseui/button";
import {
    DisplayLarge,
    ParagraphSmall,
    ParagraphXSmall,
} from "baseui/typography";
import { FormControl, StyledCaption } from "baseui/form-control";
import { Input } from "baseui/input";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../authentication/useAuth";
import AuthContainerCard from "../../components/AuthContainerCard";
import { StyledAction, StyledBody } from "baseui/card";
import { ROUTES } from "../../constants";
import { useStyletron } from "baseui";
import { useSnackbar } from "baseui/snackbar";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [css, theme] = useStyletron();

    const { enqueue } = useSnackbar();
    const loginHandler = async () => {
        setLoading(true);
        if (await login(username, password)) {
            navigate(ROUTES.DEFAULT_PAGE_URL, { replace: true });
        } else {
            enqueue({
                message: "Login Failed",
            });
        }
        setLoading(false);
    };

    return (
        <>
            <DisplayLarge
                overrides={{
                    Block: {
                        style: {
                            fontFamily: "Poppins",
                            fontWeight: "800",
                            letterSpacing: "8px",
                            textTransform: "uppercase",
                        },
                    },
                }}
            >
                Login
            </DisplayLarge>
            <AuthContainerCard>
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
        </>
    );
};

export default Login;
