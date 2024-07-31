import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import Input from "../../components/input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Alert from "../../components/Alert";
import {AiOutlineMail, AiOutlineKey} from "react-icons/ai";
import Button from "../../components/Button";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import Head from "next/head";
import {useAuth} from "../../hooks/AuthHook";
import axios from "axios";
import Loading from "../../components/Loading";
import DefaultSeo from "../../components/DefaultSeo";
import ProtectRoute from "../../components/ProtectRoute";

let API_URL = process.env.API_URL;

const ForgotPassword = () => {
    const router = useRouter();
    const {token, profile, setToken, setProfile, loading} = useAuth();
    const [load, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState("");
    const [alertColor, setAlertColor] = useState("blue");
    const [valid, setvalid] = useState({
        email: true,
        emailMessage: "Please enter a valid email",
    });
    const [credentials, setcredentials] = useState({
        email: ""
    });
    const [sentSuccessfully, setSentSuccessfully] = useState(false);
    const onSubmit = async (e) => {
        setAlert(false);

        setLoading(true);
        e.preventDefault();

        try {
            const {data} = await axios.post(
                `${API_URL}/auth/reset_password/`,
                {
                    email: credentials.email
                },
            )
            setSentSuccessfully(true);
            setText(data?.message ? data?.message : "Successfully sent reset password ");
            setAlert(true);
            setAlertColor("green");
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
                emailMessage: e?.response?.data?.payload?.email?.length
                    ? e?.response?.data?.payload?.email[0]
                    : valid.emailMessage,
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        if (profile) {
            router.push(
                router?.query?.returnUrl ? router?.query?.returnUrl : "/",
            );
        }
    }, [profile,]);

    return (
        <>
            <Head>
                <title>Forgot Password | Company</title>
            </Head>
            <DefaultSeo />
            <ProtectRoute>
            <div className=' mx-auto'>
                <Link href='/' className='absolute top-0 right-0 p-4 cursor-pointer'>
                        <FontAwesomeIcon icon={faTimes} size='lg'/>
                </Link>
                <div className='flex justify-center '>
                    <div className='w-full  flex'>
                        <div className='w-full h-100vh bg-purple hidden lg:flex lg:w-5/12 bg-cover  flex-center'>
                            <div className='w-3/4'>
                                {/* <Image
                                    src={img}
                                    className='img-resp'
                                    alt='illustration'
                                /> */}
                            </div>
                        </div>
                        <div
                            className='w-full h-100vh lg:w-7/12  p-5 px-8 md:px-32 xl:px-44  flex-column-center my-auto'>
                            <Alert
                                open={alert}
                                setOpen={setAlert}
                                className='mb-3'
                                color={alertColor}>
                                {text}
                            </Alert>
                            <h2 className=' py-2 text-3xl font-bold font-serif'>
                                Forgot Password
                            </h2>
                            {sentSuccessfully ?
                                <>
                                    <h3 className='text-xl font-serif  font-bold  my-4'>
                                        Please Check your mail
                                    </h3>
                                    <div>
                                        <p className='text-lg'>
                                            We have sent a reset password link to
                                            your email address.
                                        </p>
                                        <Button
                                            size='md'
                                            color='blue'
                                            onClick={onSubmit}
                                            outline
                                            disabled={loading}
                                            className='w-max mt-4 flex flex-row justify-center'>
                                            {loading && <Loading/>}Resend Mail
                                        </Button>
                                    </div>
                                </> :
                                <>
                                    <Input
                                        name='email'
                                        type='email'
                                        valid={valid}
                                        setvalid={setvalid}
                                        credentials={credentials}
                                        setcredentials={setcredentials}>
                                        <AiOutlineMail className='mr-2 my-auto icon-md'/>
                                        EMAIL ADDRESS
                                    </Input>
                                    <Button
                                        className='w-full flex flex-row justify-center mt-2'
                                        size='lg'
                                        color='blue'
                                        onClick={onSubmit}
                                        disabled={
                                            !(
                                                credentials.email !== "" && valid.email &&
                                                !load
                                            )
                                        }>
                                        {load && <Loading/>}
                                        Send Reset Link
                                    </Button>
                                </>
                            }
                            <hr className='mt-8 my-4 border-t bg-gray-400'/>
                            <div className='text-center mt-2'>
                                <span>New to Company? </span>
                                <Link href='/auth/signup' className='inline-block text-blue-500 align-baseline hover:text-blue-200'>
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

export default ForgotPassword;