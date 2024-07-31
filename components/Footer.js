import React from 'react'
import Link from "next/link";

import {
    FaTwitterSquare,
    FaTelegram,
    FaLinkedin
} from "react-icons/fa";
import {
    AiFillInstagram
} from "react-icons/ai";
import {
    BsDiscord
} from "react-icons/bs";
import Image from "next/image";
import logo from "../public/logo.svg"

export default function Footer() {

    return (
        <div className='bg-white dark:bg-gray-700 py-10 '>
            <div className=' w-11/12 ml-auto mr-auto '>
                <div className="grid grid-cols-12  sm:gap-4  ">
                    <div className="   col-span-12 lg:col-span-6 ">
                        <div className=''>
                            <ul className=' inline-flex items-center mb-10'>
                                <li className="w-12 h-auto">
                                    <Image
                                        src={logo}
                                        alt="icon"
                                        width="12rem"
                                        height="auto"
                                    />
                                </li>
                                <li className=' '>
                                    <h2 className=" font-bold text-2xl  ml-1"></h2>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="   col-span-6 lg:col-span-3  mt-3 sm:mt-0 ">
                        <h2 className='  text-base '>Company</h2>

                        <ul className=' mt-4  '>
                            <li className='  text-tiny  mt-3  cursor-pointer   '>
                                <Link href="faqs">
                                    FAQs
                                </Link>
                            </li>
                            <li className='  text-tiny  mt-3  cursor-pointer'>
                                <Link href="mailto: contact@letsprogressify.com">
                                    Contact Us
                                </Link>
                            </li>
                            <li className='  text-tiny  mt-3  cursor-pointer'>
                                <Link href="terms-conditions">
                                    Terms and Conditions
                                </Link>
                            </li>
                            <li className='  text-tiny  mt-3  cursor-pointer'>
                                <Link href="privacy-policy">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="   col-span-6 lg:col-span-3  mt-3 sm:mt-0 ">
                        <h2 className='  text-base  '>Community</h2>
                        <ul className=' '>
                            <li>
                                <ul className=' mt-4  inline-flex '>
                                    <li><Link href="" target={'_blank'} rel="noreferrer">
                                        <FaTwitterSquare className="w-8 h-8 mr-2 mb-2"/>
                                    </Link></li>
                                    <li><Link href="" target={'_blank'}
                                           rel="noreferrer">
                                        <AiFillInstagram className="w-8 h-8 mr-2 mb-2"/>
                                    </Link></li>
                                </ul>
                            </li>
                            <li>
                                <ul className='  inline-flex '>
                                    <li><Link href="" target={'_blank'}
                                           rel="noreferrer">
                                        <FaLinkedin className="w-8 h-8 mr-2 mb-2"/>
                                    </Link></li>
                                    <li><Link href="" target={'_blank'} rel="noreferrer">
                                        <BsDiscord className="w-8 h-8 mr-2 mb-2"/>
                                    </Link></li>
                                </ul>
                            </li>
                        </ul>


                    </div>
                </div>
                <div className=' border mt-14 '></div>
                <h3 className=' text-sm  mt-5 '>© 2022, Company</h3>


                {/*Script to trigger event conversion on GA4 without Google Tag Manager*/}
                {/*<script dangerouslySetInnerHTML={{*/}
                {/*    __html: `*/}
                {/*    var x = 0;*/}
                {/*    var timer = setInterval(function(){*/}
                {/*        if(document.querySelectorAll('.bg-green-alert').length>0){*/}
                {/*          if(x==0){*/}
                {/*            gtag('event','join_now_form')*/}
                {/*            x=1;*/}
                {/*          }*/}
                {/*          clearInterval(timer)*/}
                {/*        }*/}
                {/*    })`*/}
                {/*}}*/}
                {/*/>*/}

            </div>
        </div>
    )
}
