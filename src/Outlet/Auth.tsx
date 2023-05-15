import React from "react";
import { DisplayLarge, DisplayMedium, DisplaySmall, HeadingSmall } from "baseui/typography";
import { Outlet } from "react-router-dom";

export default function AuthOutlet() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <HeadingSmall
                overrides={{
                    Block: {
                        style: {
                            fontFamily: "Poppins",
                            fontWeight: "200",
                            letterSpacing: "8px",
                            textTransform: "uppercase",
                        },
                    },
                }}
            >
                JWT / Example
            </HeadingSmall>
            <div style={{ height: "100px" }} />
            <div
                data-testid="auth-outlet-container"
                style={{
                    width: "60%",
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}
