import { useEffect, useState } from "react"
import axios from "axios";
import Assignment_10 from "./Assignment_10"

export default function Assignment_11() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [access_token, setToken] = useState("");


    const getLogin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`https://auth.dnjs.lk/api/login`, {
                email: email,
                password: password
            });
            setToken(response.data.access_token);
            setIsError(false)
        } catch (error) {
            setIsLoading(false);
            console.log("Error:", error.response?.data || error.message)
            setIsError("Login in unsuccessful");
        }
    };

    useEffect(() => {
        if (!access_token) return;

        axios.get('https://auth.dnjs.lk/api/user', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                setIsError('Failed to fetch data properly')
                console.error(err)
            });
    }, [access_token]);

    return (
        <div>
            <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading} />
            <br />

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading} />
            <br />
            <p onChange={getLogin}>
                {isError}
            </p>
            <button
                onClick={getLogin}
                style={{ margin: "10px" }}
                disabled={isLoading}>
                Login
            </button>


            {data && (
                <>
                    <h3>You have now logged!</h3>
                    <p>Name: {data.name}</p>
                    <img src={data.avatar} alt="User Avatar" style={{ border: "50%", width: "100px" }} />
                    <p>Email: {data.email}</p>
                    <p>Subscribed: {data.subscribed ? "Yes" : "No"}</p>
                    <br />
                    <h4>Data as string:</h4>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </>
            )}


        </div>
    )
}