import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Menu = ({
    children,
    className,
    minWidth,
    placement,
    Icon,
    user,
    ...props
}) => {
    const [show, setShow] = useState(false);
    const container = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!container?.current?.contains(event.target)) {
                if (!show) return;
                setShow(false);
            }
        };

        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [show, container]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (!show) return;

            if (event.key === "Escape") {
                setShow(false);
            }
        };

        document.addEventListener("keyup", handleEscape);
        return () => document.removeEventListener("keyup", handleEscape);
    }, [show]);

    return (
        <div ref={container} className='relative z-8'>
            <div
                // className='menu focus:outline-none focus:shadow-solid flex flex-row justify-between'
                className={
                    className +
                    " cursor-pointer flex flex-row justify-between w-full h-full  capitalize rounded outline-none focus:outline-none  ease-linear transition-all duration-150 text-center " +
                    className
                }
                onClick={() => setShow(!show)}>
                    {Icon}
                    {props.indicator &&
                        (show ? (
                            <FiChevronUp className='my-auto ml-2' />
                        ) : (
                            <FiChevronDown className='my-auto ml-2' />
                        ))}
            </div>
            <Transition
                show={show}
                enter='transition ease-out duration-75 transform'
                enterFrom='opacity-10 scale-75'
                enterTo='opacity-100 scale-100'
                leave='transition ease-in duration-150 transform'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-10 scale-75'>
                <div
                    className={
                        "  origin-top-right absolute " +
                        (placement.includes("start") ? "left-0" : "right-0") +
                        " bg-white dark:bg-gray-600 " +
                        "   text-base z-50  py-4 pr-2 pl-2 list-none text-left rounded-sm shadow-md-dark mt-2 dropdown-menu"
                    }
                    style={{
                        minWidth: minWidth,
                        maxWidth: props.maxWidth ? props.maxWidth : "auto",
                        zIndex: 10,
                    }}>
                    {children}
                </div>
            </Transition>
        </div>
    );
};

export default Menu;
