import React, { useState } from "react";
import { Button } from "baseui/button";
import {
    DisplayLarge,
    DisplayMedium,
    HeadingLarge,
    ParagraphSmall,
} from "baseui/typography";
import { FormControl, StyledCaption } from "baseui/form-control";
import { Input } from "baseui/input";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../authentication/useAuth";
import { useSnackbar } from "baseui/snackbar";
import { toaster } from "baseui/toast";
import AuthContainerCard from "../../components/AuthContainerCard";
import { StyledBody, StyledAction } from "baseui/card";
import { ROUTES } from "../../constants";
import { useStyletron } from "baseui";

const SignUp = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { createUser } = useAuth();
    const snackbar = useSnackbar();
    const [css, theme] = useStyletron();
    const signUpHandler = async () => {
        setLoading(true);
        if (!(await createUser(name, username, password))) {
            snackbar.enqueue({
                message: "Unable to create user",
            });
        } else {
            snackbar.enqueue({
                message: "User Created",
            });
            // eslint-disable-next-line prefer-const
            const msg =
                "Use toaster.info(), toaster.positive(), toaster.warning(), or toaster.negative()";
            toaster.info(<>{msg}</>, {
                onClose: () => console.log("Toast closed."),
                overrides: { InnerContainer: { style: { width: "100%" } } },
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
                Sign Up
            </DisplayLarge>
            <AuthContainerCard>
                <StyledBody>
                    <FormControl label={() => "Full Name"} htmlFor={undefined}>
                        <Input
                            placeholder="John Doe"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </FormControl>
                    <FormControl label={() => "Username"} htmlFor={undefined}>
                        <Input
                            placeholder="johndoe5"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </FormControl>
                    <FormControl label={() => "password"} htmlFor={undefined}>
                        <Input
                            placeholder="j0hn_$doE"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                        />
                    </FormControl>
                </StyledBody>
                <StyledAction>
                    <Button
                        onClick={signUpHandler}
                        isLoading={loading}
                        overrides={{
                            BaseButton: {
                                style: {
                                    width: "100%",
                                },
                            },
                        }}
                    >
                        Create Account
                    </Button>
                </StyledAction>
                <StyledCaption>
                    <ParagraphSmall>
                        {`Already have an account?`}
                        <Link
                            to={ROUTES.LOGIN_URL}
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

export default SignUp;
