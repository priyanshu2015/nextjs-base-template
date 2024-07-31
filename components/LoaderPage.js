import React from "react";
import style from "../styles/loader.module.scss";
const LoaderPage = () => {
    return (
        <div
            className='h-screen w-screen bg-opacity-60 bg-white dark:bg-gray-700 flex flex-row justify-center fixed  top-0'
            style={{ alignItems: "center", zIndex: 1000 }}>
            <div className={style.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoaderPage;
