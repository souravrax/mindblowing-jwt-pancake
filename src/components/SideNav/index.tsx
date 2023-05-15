import React, { useState } from "react";
import { Navigation } from "baseui/side-navigation";

export default function SideNavigation() {
    const [activeItemId, setActiveItemId] = useState<string | undefined>(
        undefined
    );
    return (
        <Navigation
            items={[
                {
                    title: "Home",
                    itemId: "#home",
                },
                {
                    title: "Videos",
                    itemId: "#videos",
                },
                {
                    title: "Photos",
                    itemId: "photos",
                },
            ]}
            activeItemId={activeItemId}
            onChange={({ item }) => {
                setActiveItemId(item.itemId);
            }}
        />
    );
}
