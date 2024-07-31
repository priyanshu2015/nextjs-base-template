import Head from "next/head";
import LandingPage from "../components/landingPage";
import React from "react";
import ProtectRoute from "../components/ProtectRoute";
import DefaultSeo from "../components/DefaultSeo";
import Footer from "../components/Footer";

const ENV = process.env.ENV;

export default function Home() {
    return (
        <>
            <DefaultSeo />
            <Head>
                <title>Default Base Title</title>

                {/* Adding Google Adsense for home page only */}
                {ENV === "prod" && (
                    <>
                        {/*Google tag (gtag.js) for Google AdSense*/}
                        <script async src="https://www.googletagmanager.com/gtag/js?id=<Google Adsense tag Id>" />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '<G4 ID>');
                            `
                            }}/>
                    </>
                )}

            </Head>
            {/*Google Tag Manager (noscript)*/}
            {/*{ENV === "prod" && <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<ID>"*/}
            {/*                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>}*/}
            {/*End Google Tag Manager (noscript)*/}
            <ProtectRoute>
                <LandingPage/>
                <Footer/>
            </ProtectRoute>
        </>

    );
}
