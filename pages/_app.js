import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import {ThemeProvider} from "next-themes";
import Layout from "../layouts/base";
import {AuthProvider} from "../hooks/AuthHook";
import React, {useState} from "react";


// if (process.env.NODE_ENV === 'development') {
//     const whyDidYouRender = require('@welldone-software/why-did-you-render');
//     whyDidYouRender(React, {
//       trackAllPureComponents: true,
//     });
//   }


function MyApp({Component, pageProps}) {
    const [sidebar, setSidebar] = React.useState(false);
    const getLayout = Component.getLayout || ((page) => page);
    const NewLayout = Component.Layout ? Component.Layout : React.Fragment;
    const ComponentProvider = Component.Provider
        ? Component.Provider
        : React.Fragment;

    return (
        // Create a custom ThemeProvider for own logic or add the logic to control theme by yourself in Layout or parent component
        <ThemeProvider attribute='class' defaultTheme="dark">
            <AuthProvider>
                <div
                // Setting dark here at global level to force dark theme
                    className='dark bg-gray-body text-white max-w-screen min-h-screen'
                    style={{maxWidth: "100vw!important"}}>
                    <Layout sidebar={sidebar} setSidebar={setSidebar}>
                        {
                            Component.Layout ? (
                                <NewLayout sidebar={sidebar} setSidebar={setSidebar}>
                                    <Component {...pageProps} />
                                </NewLayout>
                            ) : (
                                <NewLayout>
                                    <Component {...pageProps} />
                                </NewLayout>
                            )
                        }
                    </Layout>
                </div>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default MyApp;