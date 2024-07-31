import { useGoogleLogin } from '@react-oauth/google';
import Image from "next/image";
import google_icon from "../public/images/google_icon.svg";


const GoogleSignInButton = ({handleGoogleSignIn}) => {

  const login = useGoogleLogin({
      onSuccess: tokenResponse => handleGoogleSignIn(tokenResponse),
  });

  return (
      <button className="bg-gray-body border border-blue rounded-md py-3 mb-2 flex flex-row justify-center items-center transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105" onClick={() => login()}><Image src={google_icon} alt="google_logo" /> <p className='ml-2'>Sign in with Google</p></button>
  );
};

export default GoogleSignInButton;