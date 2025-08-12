import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function LogScreen({ setLogged }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [_, setToken] = useState("");
    const [error, setError] = useState(false)
    const [rememberMe, setRememberMe] = useState(false);


    const getLogin = async () => {

        setLoading(true);
        try {
            const response = await axios.post(`https://auth.dnjs.lk/api/login`, {
                email,
                password
            });
            const token = response.data.access_token;

            if (rememberMe) {
                localStorage.setItem("access_token", token);
                localStorage.setItem("signedin", "true");
            } else {
                sessionStorage.setItem("access_token", token);
                sessionStorage.setItem("signedin", "true");
            }

            setToken(token);
            setLogged(true);
            setError(false)
            localStorage.setItem("access_token", token);
            console.log(token)

        } catch (error) {
            setLoading(false);
            console.log("Error:", error.response?.data || error.message);
            setError("Login in unsuccessful");
            setLogged(false);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        const saved = localStorage.getItem("rememberMe");
        if (saved !== null) {
            setRememberMe(saved === "true")
        }

    }, []);

    return (
        <div>
            <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading} />
            <br />

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading} />
            <br />
            <p
                onChange={getLogin}>
                {error}
            </p>

            <span>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => {
                        const newValue = !rememberMe;
                        setRememberMe(newValue);
                        localStorage.setItem("rememberMe", newValue);
                    }}

                />
                Keep me logged in
            </span>
            
            <br />

            <button
                onClick={getLogin}
                style={{ margin: "10px" }}
                disabled={loading}>
                Login
            </button>
        </div>
    )

}

function ProfileScreen({ setLogged }) {
    const [data, setData] = useState(null);
    const [access_token, setToken] = useState("");
    const [_, setIsSignedin] = useState(false);
    const [error, setError] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

        setToken(savedToken);
        setIsSignedin(true);

        axios.get("https://auth.dnjs.lk/api/user", {
            headers: {
                Authorization: `Bearer ${savedToken}`
            }
        })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                setError("Failed to fetch data properly");
                console.error(err);
            });

    }, []);

    const logOut = async () => {
        const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
        setLoggedOut(true);
        try {
            await axios.post('https://auth.dnjs.lk/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            setLoggedOut(true);

            localStorage.removeItem("access_token");
            localStorage.removeItem("signedin");
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("signedin");

            setLogged(false);
            console.log('Logout Successful')
        } catch (error) {
            console.error("Logout failed")
        } finally {
            setLoggedOut(true);
        }

    };

    return (
        <div>
            {data ? (
                <div>
                    <h3>You have now logged in!</h3>
                    <p>Name: {data.name}</p>
                    <p>Email: {data.email}</p>
                    <img
                        src={data.avatar}
                        alt="User Avatar"
                        style={{ borderRadius: "50%", width: "100px" }}
                    />
                    <p>Subscribed: {data.subscribed ? "Yes" : "No"}</p>

                    <button
                        onClick={logOut}
                        disabled={loggedOut}
                    >
                        {loggedOut ? "Logging out..." : "Logout"}
                    </button>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Loading profile...</p>
            )}

        </div>
    )
}

export default function Assignment_13() {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const token =
            localStorage.getItem("access_token") ||
            sessionStorage.getItem("access_token");

        const signedIn =
            localStorage.getItem("signedin") ||
            sessionStorage.getItem("signedin");

        if (token && signedIn === "true") {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, []);

    return logged ? <ProfileScreen setLogged={setLogged} /> : <LogScreen setLogged={setLogged} />
} 