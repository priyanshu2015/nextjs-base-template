import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";;
function Navlink({ href, exact, children, ...props }) {
    const { asPath, pathname } = useRouter();
    // commenting till only waitlist page is out
    const isActive = exact ? asPath === href : asPath.startsWith(href);

    if (isActive) {
        props.className += " active";
    }

    return (
        <Link href={href} {...props}>{children}
        </Link>
    );
}
export default Navlink;
