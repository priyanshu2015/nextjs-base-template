import { useAuth } from "../hooks/AuthHook";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProtectRoute = ({ children }) => {
    const router = useRouter();
    const { profile, loading } = useAuth();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() =>{
        // redirect to login page if accessing a private page and not logged in
        let publicPaths = ["", "/", "/privacy-policy", "/terms-conditions"];

        const path = router.pathname.split("?")[0];

        // For protected routes, the profile (not the token) is checked initially. The profile endpoint is hit first, and only if a successful response is received, the page is shown.
        // The profile endpoint checks if a token is available and if it is valid or expired.
        // This process happens only the first time (when the profile starts using our web app) or during a forced reload (when the profile object is not present). The profile object is stored in React context.
        // If the profile object is present and the token expires while the profile is using the app, the user currently has to refresh the page or If any authenticated endpoint is hit and an error response is received, we call the checkToken function to check if token is expired and take action accordingly.
        if (!loading && !profile && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: "/auth/login",
                query: { returnUrl: router.asPath },
            });
        } else {
            setAuthorized(true);
        }
    }, [profile, loading]);

    // This will prevent children from rendering till user is authorized, but this doesn't ensure profile or token states are filled
    return authorized && children;
};
export default ProtectRoute;