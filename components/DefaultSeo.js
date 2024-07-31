import Head from "next/head";
import seoData from "../public/static_data/seo_data.json";

const DefaultSeo = ({
    ...props
}) => {

    return (
        <Head>
            <meta property="og:site_name" content={seoData["ogSiteName"]}></meta>
            <meta property="og:title" content={seoData["ogTitle"]} />
            <meta
                property="og:description"
                content={seoData["ogDescription"]}
            />
            <meta
                property="og:url"
                content={seoData["ogUrl"]}
            />
            <meta
                property="og:image"
                content={seoData["ogImage"]}
            />
        </Head>
    );
};

export default DefaultSeo;
