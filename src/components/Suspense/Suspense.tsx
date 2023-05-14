import React, { Suspense as ReactSuspense } from "react";

const SuspenseComponent = () => {
    return <>Loading</>;
};

const Suspense = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactSuspense fallback={<SuspenseComponent />}>
            {children}
        </ReactSuspense>
    );
};

export default Suspense;