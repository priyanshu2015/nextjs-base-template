/* eslint-disable @next/next/no-img-element */

import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import style from "../styles/navbar.module.scss";
import Link from "next/link";
import {useTheme} from "next-themes";
import Dropdown from "./Dropdown";
import Drawer from "./AppDrawer";
import {RiUserSettingsLine} from "react-icons/ri";
import {
    AiOutlineUser,
    AiOutlineMenu,
} from "react-icons/ai";
import {useAuth} from "../hooks/AuthHook";
import data from "../public/data.json";
import Navlink from "./Navlink";
import {CgChevronDown} from "react-icons/cg";
import {MdLogout} from "react-icons/md";
import Image from "next/image";
import logo from "../public/logo.svg"
const API_URL = process.env.API_URL

const col =
    data.colors[
    Math.floor(Math.random() * (data.colors.length - 1 - 0 + 1)) + 0
        ].hex;

const sidebarPages = ["roadmaps", "account", "codesheets"];
const sidebarRoadmapPages = ["my_roadmaps", "starred", "explore", "create"]
const Navbar = (props) => {
    const {token, logout, profile} = useAuth();
    const {asPath, pathname} = useRouter();
    const router = useRouter();
    const {theme, setTheme} = useTheme();
    const [stickyNav, setStickyNav] = useState(false);

    const Icon = (
        <div className='rounded bg-gray-200 dark:bg-gray-600 p-1.5'>
            {profile?.avatar ? (
                <img
                    alt='a'
                    src={API_URL + profile.avatar}
                    className='rounded-full  h-7 w-7 text-white flex-center'
                />
            ) : (
                <div
                    className='rounded-full  h-7 w-7 text-white flex-center'
                    style={{
                        backgroundColor: col,
                    }}>
                    {profile?.username?.length ? (
                        profile?.username[0].toUpperCase()
                    ) : (
                        <AiOutlineUser className='icon-md'/>
                    )}
                </div>
            )}
        </div>
    );
    return (
        <div
            className={`${
                asPath.split("/")[1].split("?")[0] === "auth"
                    ? "hidden"
                    : `px-3 lg:px-6  ${
                        stickyNav || asPath.split("/")[1].split("?")[0].startsWith("#") === false && !["", "products"].includes(asPath.split("/")[1].split("?")[0])
                            ? style.navbar_sticky +
                            " bg-white dark:bg-gray-700 border-b-0 border-gray-600 shadow"
                            : style.navbar
                    }`
            }`}
            style={{zIndex: 15}}>
            <div
                className={
                    "flex flex-row justify-between lg:justify-start lg:w-auto"
                }
                style={{alignItems: "center"}}>
                <div className='flex flex-row'>
                    {(sidebarPages.includes(
                        asPath.split("/")[1].split("?")[0],
                    )) && (
                        <AiOutlineMenu
                            className='icon-md my-auto mr-2 cursor-pointer'
                            onClick={() => {
                                props?.setSidebar(!props.sidebar);
                            }}
                        />
                    )}


                    <Drawer
                        className='mr-2'
                        minWidth='21rem'
                        placement='bottom-start'
                        Icon={
                            <div
                                href={"/"}>
                                <div className='flex-center hover:text-white'>
                                    <Image
                                        src={logo}
                                        alt='icon'
                                        className='w-8 h-auto fa-lg inline-block'
                                        priority={true}
                                    />
                                    <div className='hidden ml-1 sm:block font-semibold text-base capitalize'>
                                        {"Company Name"}
                                    </div>

                                    <div className="font-normal border-2 rounded-sm border-blue  px-2 text-xs ml-1">
                                            Beta
                                        </div>
                                    {
                                        <CgChevronDown className='icon-md my-auto ml-1'/>
                                    }
                                </div>
                            </div>
                        }>
                        <div
                            className='text-3xl m-1 grid grid-cols-3 gap-2  justify-center '
                            style={{zIndex: 2}}>
                            {}
                        </div>
                    </Drawer>
                </div>
            </div>

            {/*<Search asPath={asPath} className='w-1/3' />*/}
            {(asPath.split("/")[1].split("?")[0] === "" ||
                asPath.split("/")[1].split("?")[0] === "terms-conditions" ||
                asPath.split("/")[1].split("?")[0] === "privacy-policy" ||
                asPath.split("/")[1].split("?")[0] === "faqs" ||
                asPath.split("/")[1].split("?")[0].startsWith("#"))
                && (
                    <>
                        {
                            <div className='navbar-links hidden lg:flex lg:space-x-8 ml-12'>

                                <Link
                                    href='/#products'
                                    // exact={true}
                                    className='links'>
                                    Products
                                </Link>

                                <Link
                                    href='/#our-aim'
                                    // exact={true}
                                    className='links'>
                                    Our Aim
                                </Link>

                                <Link
                                    href='/#subscribe'
                                    // exact={true}
                                    className='links'>
                                    Subscribe
                                </Link>

                            </div>
                        }
                    </>
                )}

            <div className='flex space-x-5 ml-auto'>
                {!profile ? (
                    <button
                        className="whitespace-nowrap text-white bg-blue hover:bg-blue-500 rounded-sm sm:rounded-md px-6 py-2  sm:text-tiny"
                        onClick={() => {
                            router.push({
                                pathname: "/auth/login",
                                query: { returnUrl: router.asPath },
                            });
                        }}>
                        Login
                    </button>
                ) : (
                    <>
                        <Dropdown
                            minWidth='8rem'
                            maxWidth="18rem"
                            Icon={Icon}
                            placement='bottom-end'
                            className='hover:bg-gray-100 dark:hover:bg-gray-600'>

                            <Link href='/profile' className={
                                        "flex flex-row text-sm py-2 px-2.5 font-normal w-full whitespace-nowrap bg-transparent " +
                                        " bg-white dark:bg-gray-600"
                                    }>
                                    {profile?.avatar ? (
                                        <img
                                            alt='a'
                                            src={API_URL + profile.avatar}
                                            className='rounded-full h-7 w-7 text-white flex-center flex-shrink-0'
                                        />
                                    ) : (
                                        <div
                                            className='rounded-full  h-7 w-7 text-white flex-center flex-shrink-0'
                                            style={{
                                                backgroundColor: col,
                                            }}>
                                            {profile?.username?.length ? (
                                                profile?.username[0].toUpperCase()
                                            ) : (
                                                <AiOutlineUser className='icon-md'/>
                                            )}
                                        </div>
                                    )}
                                    <div className="ml-2 overflow-hidden truncate">@{profile?.username}</div>
                            </Link>
                            <hr className='my-1'/>

                            <Link href='/account'
                                    className={
                                        "flex flex-row text-sm py-1.5 px-2.5 font-normal  w-full whitespace-nowrap bg-transparent " +
                                        " bg-white dark:bg-gray-600 "
                                    }>
                                    <RiUserSettingsLine className='icon-sm mr-2'/>
                                    Account

                            </Link>
                            <div
                                className={
                                    "flex flex-row text-sm py-1.5 px-2.5 font-normal  w-full whitespace-nowrap bg-transparent " +
                                    " bg-white dark:bg-gray-600 cursor-pointer"
                                }
                                onClick={logout}>
                                <MdLogout className='icon-sm mr-2'/>
                                Logout
                            </div>
                        </Dropdown>
                    </>)}
            </div>
        </div>
    );
};

export default Navbar;