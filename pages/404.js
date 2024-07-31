import Link from 'next/link'
import Lottie from "lottie-react";
import animation404data from "../public/lottie/404.json";
import React from "react";
import Button from "../components/Button";
import {useRouter} from "next/router";
import DefaultSeo from "../components/DefaultSeo";
import ProtectRoute from "../components/ProtectRoute";


export default function FourOhFour() {
    const router = useRouter();
    function Animation404() {
        return (
            <div>
                <Lottie animationData={animation404data} loop={true} autoplay={true} className="mx-auto lg:w-7/12"/>
                <br/>
            </div>
        );
    }
    return <>
        <DefaultSeo />
        <ProtectRoute>
        <Animation404 />
        <Button
            size='md'
            color='blue'
            onClick={() => router.push("/")}
            className='mx-auto flex flex-row justify-center'>
                Go back home
        </Button>
        </ProtectRoute>
    </>
}