import Link from "next/link";;
import React from "react";

const Button = ({
    className,
    children,
    size,
    color,
    outline,
    link,
    disabled,
    ...props
}) => {
    let style;
    switch (size) {
        case "xl":
            style = "rounded-xl font-normal text-lg py-4 lg:py-6 px-8 lg:px-12";
            break;
        case "lg":
            style = "rounded-lg font-normal text-lg py-3 lg:py-5 px-6 lg:px-10";
            break;
        case "md":
            style = "rounded-md font-normal text-base py-2 px-4 lg:py-3 lg:px-6";
            break;
        case "sm":
            style = "rounded-sm font-normal text-sm py-2 lg:py-2 px-3 lg:px-4";
            break;
        case "xs":
            style = "rounded-xs font-normal text-xs py-1.5 lg:py-1.5 px-2 lg:px-3";
            break;
        default:
            style = "text-md font-normal py-2 px-6 lg:px-10";
    }
    return link ? (
        <Link href={link} className={`${style} ${className} transition-all duration-200 ${
                    outline
                        ? `border-2 border-${color} text-${color} bg-transparent hover:text-white hover:bg-${color}`
                        : `border-2 border-${color} bg-${color} hover:bg-${color}-400 text-white hover:text-white`
                }`}>
                {children}
        </Link>
    ) : (
        <button
            {...props}
            className={`${style} ${className} transition-all duration-200 ${
                outline
                    ? ` border-2 border-${color} text-${color} bg-transparent hover:text-white hover:bg-${color}`
                    : ` border-2 border-${color} bg-${color} hover:bg-${color}-400 text-white`
            }`}
            disabled={disabled === undefined ? false : disabled}>
            {children}
        </button>
    );
};

export default Button;
