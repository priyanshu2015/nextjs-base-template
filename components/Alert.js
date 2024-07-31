import { Transition } from "@headlessui/react";
import React, {useEffect, useState} from "react";
import {
    AiOutlineClose,
    AiOutlineWarning,
    AiFillCheckCircle,
} from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";

const Alert = ({ children, color, open, setOpen, className }) => {
    color = color ? color : "green";
    useEffect(() => {
        if (open) {
            setTimeout(() => setOpen(false), 5000);
        }
    }, [open, setOpen]);

    return (
        <Transition
            show={open}
            enter='transition transform ease-out duration-300 '
            enterFrom='opacity-10 -translate-x-32'
            enterTo='opacity-100 translate-x-0'
            leave='transition transform ease-in-out duration-300 '
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-10 -translate-x-32'
            // style={{ position: "absolute", top: "0", zIndex: "500" }}
            className=' w-full mx-auto flex flex-row items-center justify-center justify-between alert px-4'>
            <div
                className={` w-full rounded bg-${color}-alert border-${color} p-4 flex flex-row justify-between ${className} lg:ml-3 mb-4 mx-auto shadow-md dark:shadow-md text-white`}
                role='alert'
                // style={{ boxShadow: "0px 2px 12px #888" }}
            >
                <span className={`flex flex-row w-11/12`}>
                    {color === "red" ? (
                        <AiOutlineWarning
                            className={`my-auto icon-md mr-2 text-white `}
                        />
                    ) : color === "yellow" ? (
                        <RiErrorWarningLine
                            className={`my-auto icon-md mr-2 text-white `}
                        />
                    ) : (
                        <BsCheckCircle
                            className={`my-auto icon-md mr-2 text-white `}
                        />
                    )}

                    <span
                        className='my-auto w-full'
                        style={{
                            // wordBreak: "break-all",
                            // whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}>
                        {children}
                    </span>
                </span>
                <MdOutlineClose
                    className='cursor-pointer my-auto icon-md ml-1 lg:ml-3 text-white'
                    onClick={() => setOpen(!open)}
                />
            </div>
        </Transition>
    );
};

export default Alert;
