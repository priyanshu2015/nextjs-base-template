import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import Input from "../../components/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Alert from "../../components/Alert";
import { AiOutlineMail, AiOutlineKey } from "react-icons/ai";
import Button from "../../components/Button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "../../hooks/AuthHook";
import axios from "axios";
import Loading from "../../components/Loading";
import DefaultSeo from "../../components/DefaultSeo";
import ProtectRoute from "../../components/ProtectRoute";
import GoogleSignInButton from "../../components/GoogleSignInButton"
import { GoogleOAuthProvider } from '@react-oauth/google';

let GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
let API_URL = process.env.API_URL;


const Login = () => {
    const router = useRouter();
    const { token, profile, setToken, setProfile, loading } = useAuth();
    const [load, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState("");
    const [alertColor, setAlertColor] = useState("blue");
    const [valid, setvalid] = useState({
        email: true,
        password: true,
        emailMessage: "Please enter a valid email",
        passwordMessage: "Please enter a valid password",
    });
    const [credentials, setcredentials] = useState(null);
    const onSubmit = async (e) => {
        setAlert(false);

        setLoading(true);
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${API_URL}/auth/login/`,
                {
                    username_or_email: credentials.email,
                    password: credentials.password,
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

        } catch (e) {
            setAlertColor("red");
            const err = e?.response?.data?.message
                ? e?.response?.data?.message
                : "Server Error";
            setText(err);
            setAlert(true);
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
            setLoading(false);
        }

    };

    const handleGoogleSignIn = async (response) => {
        setLoading(true);
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

    // If dependency array is empty, this hook will be triggered only after the component is rendered
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
                <title>Log in | Company</title>
                {/* <script src="https://accounts.google.com/gsi/client" async defer></script> */}
            </Head>
            <DefaultSeo />
            <ProtectRoute>
            <div className=' mx-auto'>
                <Link href='/' className='absolute top-0 right-0 p-4 cursor-pointer'>
                        <FontAwesomeIcon icon={faTimes} size='lg' />
                </Link>
                <div className='flex justify-center '>
                    {/* <!-- Row --> */}
                    <div className='w-full  flex'>
                        {/* <!-- Col --> */}
                        <div className='w-full h-100vh bg-purple hidden lg:flex lg:w-5/12 bg-cover  flex-center'>
                            <div className='w-3/4'>
                                {/* <Image
                                    src={img}
                                    className='img-resp'
                                    alt='illustration'
                                /> */}
                            </div>
                        </div>
                        {/* <!-- Col --> */}
                        <div className='w-full h-100vh lg:w-7/12  p-5 px-8 md:px-32 xl:px-44  flex-column-center my-auto'>
                            <Alert
                                open={alert}
                                setOpen={setAlert}
                                className='mb-3'
                                color={alertColor}>
                                {text}
                            </Alert>
                            <h2 className=' py-2 text-3xl font-bold font-serif mb-2'>
                                Sign in to
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

                                <div className='text-right mb-3'>
                                    <Link href='/auth/forgot_password'
                                            className='inline-block text-blue-500 align-baseline hover:text-blue-200 text-sm'
                                            >
                                            Forgot Password?
                                    </Link>
                                </div>
                                {/* <button className='w-full text-lg p-4 rounded bg-blue hover:bg-blue-400 text-white transition-all duration-100 ease-in-out'>
                                Sign in now
                            </button> */}
                                <Button
                                    className='w-full flex flex-row justify-center'
                                    size='md'
                                    color='blue'
                                    onClick={onSubmit}
                                    disabled={
                                        !(
                                            valid.email &&
                                            valid.password &&
                                            !load
                                        )
                                    }>
                                    {load && <Loading />}
                                    Sign in now
                                </Button>
                                <div className='text-center mt-2 '>
                                    <span className="text-sm">New to Company? </span>
                                    <Link href={`/auth/signup?returnUrl=${encodeURIComponent(router?.query?.returnUrl)}`} className='inline-block text-blue-500 align-baseline hover:text-blue-200 text-sm'>
                                            Sign up!

                                    </Link>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            </ProtectRoute>
        </>
    );
};

export default Login;