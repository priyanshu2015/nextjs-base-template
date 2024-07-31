import React, { useEffect, useState, useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";
import {useRouter} from "next/router";
import Link from "next/link";;
import { Transition } from "@headlessui/react";


const Drawer = ({
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
    const {asPath, pathname} = useRouter();

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

    useEffect(() => {
        const handleMouseLeave = (event) => {
            // Action to perform when the mouse leaves the component
            setShow(false);
        }

        const componentElement = container.current;

        // Add event listener for mouseleave when component mounts
        componentElement.addEventListener('mouseleave', handleMouseLeave);

        // Clean up by removing event listener when component unmounts
        return () => {
        componentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
      }, [show]);

    return (
        <div ref={container} className='md:relative'>
            <div
                // className='menu focus:outline-none focus:shadow-solid flex flex-row justify-between'
                className={
                    className +
                    " cursor-pointer flex flex-row justify-between w-full h-full font-bold uppercase rounded outline-none focus:outline-none  ease-linear transition-all duration-150 text-center " +
                    className
                }
                onClick={() => setShow(!show)}>
                {Icon ? (
                    Icon
                ) : (
                    <CgMenuGridR className='my-auto icon-md hover:text-gray-400 ' />
                )}
            </div>

            <Transition
                show={show}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div
                    className={
                        (placement?.includes("bottom")
                            ? "origin-top-right "
                            : "origin-bottom-right ") +
                        "  absolute " +
                        (placement?.includes("start") ? "left-0" : "right-0") +
                        " p-2 min-w-auto md:min-w-max drawer z-10"
                    }
                    style={{
                        maxWidth: props.maxWidth ? props.maxWidth : "95%",
                        zIndex: 20,
                    }}>
                    <div
                        className={
                            " bg-white dark:bg-gray-600 " +
                            "   text-base z-50 py-2 pb-2 pr-2 pl-2 list-none text-left rounded-xl shadow-lg-dark dropdown-menu"
                        }>
                        {asPath.split("/")[1].split("?")[0] !== "" &&<Link href='/' className='flex flex-row p-4 w-full'>
                                <AiOutlineArrowLeft className='icon-sm mr-2' />{" "}
                                Back to Home
                        </Link>}
                        {children}
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default Drawer;
