import React from "react";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { AuthContainer } from "./style";

const AuthContainerCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContainer>
            <Card
                overrides={{
                    Root: {
                        style: {
                            width: "40%",
                            minWidth: "380px",
                        },
                    },
                }}
            >
                {children}
            </Card>
        </AuthContainer>
    );
};

export default AuthContainerCard;
