import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import Button from "../../../../components/Button";
import {useAuth} from "../../../../hooks/AuthHook";
import Head from "next/head";
import axios from "axios";
import Alert from "../../../../components/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Lottie from "lottie-react";
import errorAnimationData from "../../../../public/lottie/error.json";
import doneAnimationData from "../../../../public/lottie/success.json";
import {NextResponse} from "next/server";
import DefaultSeo from "../../../../components/DefaultSeo";
import ProtectRoute from "../../../../components/ProtectRoute";

let API_URL = process.env.API_URL;

const Login = () => {
    const {token, setToken, profile, setProfile, loading, setLoading} = useAuth();
    const router = useRouter();
    const [valid, setvalid] = useState({
        new_password: true,
        new_passwordMessage: "Please enter a valid password",
        new_password_verify: true,
        new_password_verifyMessage: "Doesn't match",
    });
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState("");
    const [showPrompt, setShowPrompt] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [alertColor, setAlertColor] = useState("blue");
    const [credentials, setcredentials] = useState(null);
    const [invalidLink, setInvalidLink] = useState(false);

    function ErrorAnimation() {
        return (
            <div>
                {/*<Lottie options={doneAnimationData} height={200} width={200}/>*/}
                <Lottie animationData={errorAnimationData} loop={true} autoplay={true} className="m-auto w-11/12"/>
                <br/>
                <p className="text-center mb-5 font-medium">
                    Activate link is Invalid or Expired! ⚠️
                    <br/>Please try to resend Activate link by signing up again.<br/> <Button
                    size={"md"}
                    color={"blue"}
                    onClick={() => router.push("/auth/signup")} className="my-2">Signup</Button> <br/>For any queries,
                    contact us at <Link
                    href="mailto: support@company.com" className="text-blue">support@company.com</Link>.
                </p>
            </div>
        );
    }

    function SuccessAnimation() {
        return (
            <div>
                {/*<Lottie options={doneAnimationOptions} height={200} width={200}/>*/}
                <Lottie animationData={doneAnimationData} loop={true} autoplay={true} className="m-auto mt-10"/>
                <p className="text-center mt-8 text-lg font-semibold">
                    Welcome to Company! 🎉</p>
                <p className="text-center font-medium mb-8">
                    <br/>
                    Simplify your learning journey and help others grow by sharing your journey. <br/>
                </p>
                <div className="text-center">
                    <a href={"/"}
                       className={`rounded-md text-md py-2 px-4 lg:py-3 lg:px-6 mt-4 transition-all duration-200 border-2 border-blue bg-blue hover:bg-blue-400 text-white hover:text-white`}>
                        Explore Company
                    </a>
                </div>
            </div>
        );
    }

    useEffect(() => {
        (async () => {
            if (!profile) {
                // hit reset endpoint with GET request method in order to check link is valid or not
                try {
                    const {data} = await axios.get(
                        `${API_URL}/auth/activate/${window.location.pathname.split("/")[3]}/${window.location.pathname.split("/")[4]}/`
                    );
                    setShowPrompt(true);
                    setAlert(true);
                    setAlertColor("green");
                    const err = data.message;
                    setText(err);
                } catch (e) {
                    setShowPrompt(true);
                    setInvalidLink(true);
                    setAlert(true);
                    setAlertColor("red");
                    const err = e?.response?.data?.message
                        ? e?.response?.data?.message
                        : "Server Error";
                    setText(err);
                }
            }
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Activate Email | Company</title>
            </Head>
            <DefaultSeo />
            <ProtectRoute>
            <Alert
                open={alert}
                setOpen={setAlert}
                className='mb-3'
                color={alertColor}>
                {text}
            </Alert>
            <div className=' mx-auto'>
                {showPrompt ? (
                    <a
                        className='absolute top-0 right-0 p-4 cursor-pointer'
                        onClick={() => setShowPrompt(false)}>
                        <FontAwesomeIcon icon={faTimes} size='lg'/>
                    </a>
                ) : (
                    <Link href='/' className='absolute top-0 right-0 p-4 cursor-pointer'>
                            <FontAwesomeIcon icon={faTimes} size='lg'/>
                    </Link>
                )}
                <div className='flex justify-center '>
                    {/* <!-- Row --> */}
                    <div className='w-full  flex'>
                        {/* <!-- Col --> */}
                        <div className='w-full h-100vh bg-purple hidden lg:flex lg:w-5/12 bg-cover flex-center'>
                            <div className='w-3/4'>
                                {/* <Image
                                    src={img}
                                    className='img-resp'
                                    alt='illustration'
                                /> */}
                            </div>
                        </div>
                        {/* <!-- Col --> */}
                        {showPrompt ? (
                            invalidLink === true ?
                                <div className="w-full h-100vh lg:w-7/12  p-5 px-8 md:px-32 lg:px-44">
                                    <ErrorAnimation/>
                                </div>
                                : <div className="w-full h-100vh lg:w-7/12  p-5 px-8 md:px-32 lg:px-44">
                                    <SuccessAnimation/>
                                </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            </ProtectRoute>
        </>
    );
};

export default Login;
