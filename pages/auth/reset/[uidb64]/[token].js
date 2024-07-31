import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import Button from "../../../../components/Button";
import { useAuth } from "../../../../hooks/AuthHook";
import Head from "next/head";
import axios from "axios";
import Alert from "../../../../components/Alert";
import Loading from "../../../../components/Loading";
import Input from "../../../../components/input";
import {AiOutlineKey} from "react-icons/ai";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Lottie from "lottie-react";
import errorAnimationData from "../../../../public/lottie/error.json";
import doneAnimationData from "../../../../public/lottie/success.json";
import DefaultSeo from "../../../../components/DefaultSeo";
import ProtectRoute from "../../../../components/ProtectRoute";
let API_URL = process.env.API_URL;

const Login = () => {
    const { token, setToken, profile, setProfile } = useAuth();
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
    const [loading, setLoading] = useState(false);
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
                    Reset Link is Invalid or Expired! ⚠️
                    <br/>Please try to resend Reset Password Link. <Link
                    href="/auth/forgot_password" className="text-blue">Forgot Password</Link>. <br/>For any queries, contact us at <Link
                    href="mailto: support@company.com"><a
                    className="text-blue">support@company.com</a></Link>.
                </p>
            </div>
        );
    }

    function SuccessAnimation() {
        return (
            <div>
                {/*<Lottie options={doneAnimationOptions} height={200} width={200}/>*/}
                <Lottie animationData={doneAnimationData} loop={true} autoplay={true} className="m-auto mt-10"/>
                <br/>
                <p className="text-center mt-8 font-medium">
                    Password Reset Complete! 🎉
                    <br/>
                    You can now login with new password <Link href="/auth/login" className="text-blue">Login</Link>
                </p>
            </div>
        );
    }

    const resetPassword = async(e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${API_URL}/auth/reset/${window.location.pathname.split("/")[3]}/${window.location.pathname.split("/")[4]}/`,
                credentials,
            );
            setShowPrompt(true);
            setText(data.message);
            setAlert(true);
            setAlertColor("green");
            setShowPrompt(true);
        } catch (e) {
            setText(e?.response?.data?.message);
            if (e?.response?.data?.code === "link_expired"){
                setShowPrompt(true);
                setInvalidLink(true);
            }
            setAlert(true);
            setAlertColor("red");
            setvalid({
                ...valid,
                email: !e?.response?.data?.payload?.email?.length,
                password: !e?.response?.data?.payload?.password?.length,
                emailMessage: e?.response?.data?.payload?.email?.length
                    ? e?.response?.data?.payload?.email[0]
                    : valid.emailMessage,
                passwordMessage: e?.response?.data?.payload?.password?.length
                    ? e?.response?.data?.payload?.password[0]
                    : valid.passwordMessage,
            });
        }
        setLoading(false);
    }

    // if (token && profile) router.back();
    useEffect(() => {
        if (profile){
            router.push(
                router?.query?.returnUrl ? router?.query?.returnUrl : "/",
            );
        }
    }, [profile,]);
    return (
        <>
            <Head>
                <title>Password Reset | Company</title>
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
                        <FontAwesomeIcon icon={faTimes} size='lg' />
                    </a>
                ) : (
                    <Link href='/' className='absolute top-0 right-0 p-4 cursor-pointer'>
                            <FontAwesomeIcon icon={faTimes} size='lg' />

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
                                            <ErrorAnimation />
                                        </div>
                                        : <div className="w-full h-100vh lg:w-7/12  p-5 px-8 md:px-32 lg:px-44">
                                        <SuccessAnimation />
                                    </div>
                        ) : (
                            <div className='w-full h-100vh lg:w-7/12  p-5 px-8 md:px-32 lg:px-44  flex-column-center my-auto'>
                                <h2 className=' py-2 text-3xl font-bold font-serif'>
                                    Reset Password
                                </h2>
                                <form
                                    className=' py-3 mb-2  rounded '
                                    onSubmit={resetPassword}>
                                    <Input
                                        name='new_password'
                                        type='password'
                                        valid={valid}
                                        setvalid={setvalid}
                                        credentials={credentials}
                                        setcredentials={setcredentials}>
                                        <AiOutlineKey className='mr-2 my-auto icon-md' />
                                        NEW PASSWORD
                                    </Input>
                                    <Input
                                        name='new_password_verify'
                                        type='password'
                                        valid={valid}
                                        setvalid={setvalid}
                                        credentials={credentials}
                                        setcredentials={setcredentials}>
                                        <AiOutlineKey className='mr-2 my-auto icon-md' />
                                        CONFIRM PASSWORD
                                    </Input>


                                    <Button
                                        className='w-full flex flex-row justify-center mt-4'
                                        size='lg'
                                        disabled={
                                            !(
                                                valid.new_password && valid.new_password_verify &&
                                                !loading
                                            )
                                        }
                                        color='blue'>
                                        {loading && <Loading />}Confirm Reset
                                    </Button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </ProtectRoute>
        </>
    );
};

export default Login;
