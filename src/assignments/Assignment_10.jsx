import { use, useState } from "react"
import { data } from "react-router-dom";
import axios from "axios";


export default function Assignment_10() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const getLogin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`https://auth.dnjs.lk/api/login`, {
                email: email,
                password: password
            });

            console.log("Login success", response.data)
            setIsError(false)
        } catch (error) {
            console.log("Error:", error.response?.data || error.message)
            setIsError("Login in unsuccessful");  
        }

    }

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
                Login</button>
        </div>
    )
}