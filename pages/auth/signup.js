import React, {useEffect, useState} from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Input from "../../components/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineMail, AiOutlineKey } from "react-icons/ai";
import Link from "next/link";;
import Button from "../../components/button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthHook";
import Head from "next/head";
import axios from "axios";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import DefaultSeo from "../../components/DefaultSeo";
import ProtectRoute from "../../components/ProtectRoute";
import GoogleSignInButton from "../../components/GoogleSignInButton"
import { GoogleOAuthProvider } from '@react-oauth/google';

let GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
let API_URL = process.env.API_URL;

const Login = () => {
    const { token, setToken, profile } = useAuth();
    const router = useRouter();
    const [valid, setvalid] = useState({
        email: true,
        password: true,
        emailMessage: "Please enter a valid email",
        passwordMessage: "Please enter a valid password",
    });
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState("");
    const [showPrompt, setShowPrompt] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertColor, setAlertColor] = useState("blue");
    const [credentials, setcredentials] = useState(null);
    const fetchProfile = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const { data } = await axios.get(
                `${API_URL}/auth/profile/`,
                {
                    headers: {
                        Authorization: `Bearer ${token.access}`,
                    },
                },
            );
            setTimeout(() => {
                router.reload();
                setLoading(false);
            }, 5000);
        } catch (e) {
            const err = e?.response?.data?.message
                ? e?.response?.data?.message
                : "Server Error";
            setText(err);
            setAlert(true);
            setAlertColor("red");
            setLoading(false);
        }
    };
    const onSubmit = async (e) => {

        setLoading(true);
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${API_URL}/auth/signup/`,
                credentials,
            );

            // const x = await JSON.parse(data);
            // console.log(x);
            const temp = {
                access: data.payload.access,
                refresh: data.payload.refresh,
            };
            setToken(temp);
            localStorage.setItem("token", JSON.stringify(temp));
            // alert(data.message);
            setText(data.message);
            setAlert(true);
            setAlertColor("green");
            setShowPrompt(true);
        } catch (e) {
            // console.log(e, e?.response, e?.response?.data?.message);
            setText(e?.response?.data?.message);
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
    };

    const handleGoogleSignIn = async (response) => {
        // console.log("Encoded JWT ID token: " + response.credential);
        try{

            const { data } = await axios.post(
                `${API_URL}/auth/google-login/`,
                {
                    token: response.access_token
                },
            )

            const temp = {
                access: data.payload.access,
                refresh: data.payload.refresh,
            };
            setToken(temp);
            localStorage.setItem("token", JSON.stringify(temp));
            setText(data?.message ? data?.message : "Success");
            setAlert(true);
            setAlertColor("green");

            setTimeout(() => {
                router.reload();
                setLoading(false);
            }, 5000);

        }

        catch (e) {
            setAlertColor("red");
            const err = e?.response?.data?.message
                ? e?.response?.data?.message
                : "Server Error";
            setText(err);
            setAlert(true);
            setLoading(false);
        }
      }

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
                <title>Sign up | Company</title>
            </Head>
            <DefaultSeo />
            <ProtectRoute>
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
                            <div className='w-full h-100vh lg:w-7/12  p-5 px-8 md:px-32 xl:px-44  flex-column-center my-auto'>
                                <Alert
                                    open={alert}
                                    setOpen={setAlert}
                                    className='mb-3'
                                    color={alertColor}>
                                    {text}
                                </Alert>
                                <h3 className='text-3xl font-serif  font-bold  my-4'>
                                    Please Check your mail
                                </h3>
                                <div>
                                    <p className='text-lg'>
                                        We have sent you a confirmation mail to
                                        ensure that our mails always reach you.
                                        Kindly click on the confirm button in
                                        the mail and then click verify below.
                                    </p>
                                    <Button
                                        size='md'
                                        color='blue'
                                        onClick={onSubmit}
                                        outline
                                        disabled={loading}
                                        className='w-max mt-4 flex flex-row justify-center'>
                                        {loading && <Loading />}Resend Mail
                                    </Button>
                                    <Button
                                        className='w-full flex flex-row justify-center mt-36'
                                        size='md'
                                        onClick={fetchProfile}
                                        color='blue'
                                        disabled={loading}>
                                        {loading && <Loading />}Verify
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className='w-full h-100vh lg:w-7/12  p-5 px-8 md:px-32 lg:px-44  flex-column-center my-auto'>
                                <Alert
                                    open={alert}
                                    setOpen={setAlert}
                                    className='mb-3'
                                    color={alertColor}>
                                    {text}
                                </Alert>
                                <h2 className=' py-2 text-3xl font-bold font-serif'>
                                    Sign up to
                                    <br /> Company
                                </h2>
                                <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
                                    <GoogleSignInButton
                                        handleGoogleSignIn={handleGoogleSignIn}
                                    />
                                </GoogleOAuthProvider>

                                <div className="flex items-center w-full mt-3 my-4">
                                    <hr className="flex-grow border-t border-gray-550" />
                                    <span className="mx-2 text-gray-500">Or</span>
                                    <hr className="flex-grow border-t border-gray-550" />
                                </div>
                                <form
                                    className=' py-3 mb-2  rounded '
                                    onSubmit={onSubmit}>
                                    <Input
                                        name='email'
                                        type='email'
                                        valid={valid}
                                        setvalid={setvalid}
                                        credentials={credentials}
                                        setcredentials={setcredentials}>
                                        <AiOutlineMail className='mr-2 my-auto icon-md' />
                                        Email
                                    </Input>
                                    <Input
                                        name='password'
                                        type='password'
                                        valid={valid}
                                        setvalid={setvalid}
                                        credentials={credentials}
                                        setcredentials={setcredentials}>
                                        <AiOutlineKey className='mr-2 my-auto icon-md' />
                                        Password
                                    </Input>

                                    <Button
                                        className='w-full flex flex-row justify-center'
                                        size='md'
                                        disabled={
                                            !(
                                                valid.email &&
                                                valid.password &&
                                                !loading
                                            )
                                        }
                                        color='blue'>
                                        {loading && <Loading />}Sign up now
                                    </Button>
                                    <div className='text-center mt-2'>
                                        <span className=''>
                                            Already have an account?{" "}
                                        </span>
                                        <Link href='/auth/login' className='inline-block  text-blue-500 align-baseline hover:text-blue-200'>
                                                Login !

                                        </Link>
                                    </div>
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