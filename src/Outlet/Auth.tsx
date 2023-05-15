import React from "react";
import { DisplayLarge, DisplayMedium, DisplaySmall } from "baseui/typography";
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
            <DisplaySmall
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
                JWT / Example
            </DisplaySmall>
            <div style={{ height: "100px" }} />
            <Outlet />
        </div>
    );
}
