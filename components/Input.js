import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
const Input = ({
                   name,
                   type,
                   children,
                   credentials,
                   setcredentials,
                   valid,
                   setvalid,
               }) => {
    const [active, setActive] = React.useState(false);

    function handleActivation(e) {
        setvalid({
            ...valid,
            [e.target.name]: check(e.target.name, e.target.value),
            [`${e.target.name}Message`]: name === "new_password" ? "Please enter a valid password" : name === "new_password_verify" ? "Incorrect": `Please enter a valid ${e.target.name}`,
        });
        setcredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
        setActive(!!e.target.value);
    }
    const check = (name, value) => {
        switch (name) {
            case "email":
                return validEmail(value);
            case "password":
                return validPassword(value);
                // for reset password
            case "new_password":
                return validPassword(value);
            case "new_password_verify":
                return validConfirmPassword(value);
        }
        return false;
    };
    const validEmail = (txt) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return txt === "" || re.test(String(txt).toLowerCase());
    };
    const validPassword = (txt) => txt.length >= 6 && txt.length < 128;
    const validConfirmPassword = (txt) => txt === credentials.new_password && txt.length >= 6 && txt.length < 128;
    return (
        <div className='mb-2 '>
            <div className='relative rounded-xl bg-gray-100 dark:bg-gray-700 '>
                <input
                    className={[
                        " focus:pt-10 outline-none w-full rounded-xl bg-transparent text-tiny sm:text-base transition-all ease-in-out duration-75 p-4 ",
                        active ? "pt-10  " : "",
                        valid[name]
                            ? "border-2 border-transparent focus:border-blue"
                            : "border-2 border-red",
                    ].join(" ")}
                    id={name}
                    name={name}
                    type={type}
                    required
                    onChange={handleActivation}
                />
                <label
                    className={[
                        "absolute font-medium cursor-text top-0 left-0 flex items-center text-black dark:text-gray-400  p-4 transition-all ease-in-out duration-75 text-tiny  sm:text-base text-opacity-60 focus:text-md focus:text-opacity-90",
                        active ? "" : "",
                    ].join(" ")}
                    htmlFor={name}>
                    {children}
                </label>
            </div>
            {!valid[name] && (
                <div className='text-red px-2 py-1 text-sm'>
                    <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className='mr-2 text-red text-sm'
                    />
                    {valid[`${name}Message`]}
                </div>
            )}
        </div>
    );
};

export default Input;