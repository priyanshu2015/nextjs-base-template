import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import LoaderPage from "../components/LoaderPage";
import { useAuth } from "../hooks/AuthHook";
import Head from "next/head";
import { useTheme } from "next-themes";
const ENV = process.env.ENV;


const Layout = ({ children, ...props }) => {
    const { loading } = useAuth();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        // Adding an additional layer to force dark theme
        setTheme("dark");
        // console.log(theme);
    }, [theme]); // Empty dependency array to run once on mount

    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="author" content="Author" />
                <meta name="google-site-verification"
                    content="GOOGLE SITE VERIFICATION ID" />
                <meta name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel='icon' href='/favicon.ico' />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US"></meta>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@twitter_handle"></meta>
                <meta name="twitter:creator" content="@twitter_handle" />

                <meta name="keywords"
                    content="a, b, c" />
                <meta
                    name="description"
                    content="Add your description here"
                    key="desc"
                />

                {/*Enabling Google Analytics & Google Tag Manager at Global Level*/}
                {ENV === "prod" && (
                    <>
                        {/*Google Analytics GA4*/}
                        <script async src="https://www.googletagmanager.com/gtag/js?id=G4 ID" />
                        <script dangerouslySetInnerHTML={{
                            __html: `
                                            window.dataLayer = window.dataLayer || [];
                                            function gtag(){dataLayer.push(arguments);}
                                            gtag('js', new Date());
                                            gtag('config', 'G4 ID');
                                        `
                        }}
                        />

                        {/*Google Tag Manager*/}
                        <script dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                    })(window,document,'script','dataLayer','GTM ID');`
                        }} />
                        {/*End Google Tag Manager*/}
                    </>)}
            </Head>

            {loading && <LoaderPage />}
            <Navbar sidebar={props.sidebar} setSidebar={props.setSidebar} />

            {React.cloneElement(children, {
                ...props,
            })}

        </div>
    );
};

export default Layout;
