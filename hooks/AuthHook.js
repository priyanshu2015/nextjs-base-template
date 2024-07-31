import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import country_data from "../public/static_data/country_data.json";

let API_URL = process.env.API_URL;

// context creation
export const AuthContext = createContext(null);

// providing context
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState("USD");
    const [country, setCountry] = useState("US");
    const [timezone, setTimezone] = useState("UTC");

    const checkToken = async (data) => {
        if (data?.code === "token_not_valid") await logout();
        // Instead of logout, we can call refreshToken here
        // If refeshToken is unsuccessful, we can call logout
    };

    const refreshToken = async (tempToken) => {
        try {
            const { data } = await axios.post(
                `${API_URL}/auth/token/refresh/`,
                {
                    refresh: tempToken?.refresh,
                },
            );
            setToken({
                ...tempToken,
                access: data.payload.access,
            });
        } catch (e) {
            alert(e?.response?.data?.message);
            await logout();
        }
    };

    const logout = async () => {
        try {
            const { data } = await axios.post(
                `${API_URL}/auth/logout/`,
                {
                    refresh: token.refresh,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token.access}`,
                    },
                },
            );
            setToken(null);
            setProfile(null);
            localStorage.removeItem("token");

            // router.push("/auth/login");
        } catch (e) {
            setToken(null);
            setProfile(null);
            localStorage.removeItem("token");
        }
    };

    const fetchProfile = async (tempToken) => {
        try {
            const { data } = await axios.get(
                `${API_URL}/profile/`,
                {
                    headers: {
                        Authorization: `Bearer ${tempToken.access}`,
                    },
                },
            );
            setProfile(data.payload);
        } catch (e) {
            if (e?.response?.data?.code === "token_not_valid") {
                await refreshToken(tempToken);
            }
        }
    };

    const initialize = async () => {

        setLoading(true);
        if (localStorage.getItem("token")) {
            const tempToken = JSON.parse(localStorage.getItem("token"));
            setToken(tempToken);
            await fetchProfile(tempToken);
        }

        // Geolocation Details
        try {
            let timezone = localStorage.getItem("timezone");
            if (!timezone) {
                // Intl return timezone in Asia/Calcutta
                timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (timezone === "Asia/Calcutta") {
                    timezone = "Asia/Kolkata";
                }
                setTimezone(timezone);
                localStorage.setItem("timezone", timezone);
            }
            else {
                setTimezone(timezone);
            }
            let country = localStorage.getItem("country");
            if (!country) {
                if (timezone === "Asia/Calcutta") {
                    country = country_data.zones["Asia/Kolkata"]["countries"][0];
                }
                else {
                    country = country_data.zones[timezone]["countries"][0];
                }
                setCountry(country);
                localStorage.setItem("country", country);
            }
            else {
                setCountry(country);
            }
            let currency = localStorage.getItem("currency");
            if (!currency) {
                if (country === "IN") {
                    currency = "INR";

                }
                else {
                    currency = "USD";
                }
                setCurrency(currency)
                localStorage.setItem("currency", currency);
            }
            else {
                setCurrency(currency)
            }
        }
        catch (e) {
            let country = "US"
            let timezone = "UTC"
            let currency = "USD"
            setTimezone(timezone)
            setCurrency(currency)
            setCountry(country)
            localStorage.setItem("country", country)
            localStorage.setItem("timezone", timezone)
            localStorage.setItem("currency", currency)
        }

        setLoading(false);
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                logout,
                profile,
                setProfile,
                loading,
                setLoading,
                checkToken,
                country,
                setCountry,
                currency,
                setCurrency,
                timezone,
                setTimezone
            }}>
            {children}
        </AuthContext.Provider>
    );
};

// context consumer
export const useAuth = () => useContext(AuthContext);