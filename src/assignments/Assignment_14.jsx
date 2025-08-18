import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function LogScreen({ setLogged }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
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
                style={{ margin: "10px", color: "cyan" }}
                disabled={loading}
            >
                {loading ? 'Loging In...' : 'Login'}
            </button>
        </div>
    )

}

function ProfileScreen({ setLogged }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");


        axios.get("https://auth.dnjs.lk/api/user", {
            headers: {
                Authorization: `Bearer ${savedToken}`
            }
        })
            .then(res => {
                setData(res.data);
                console.log(res.data)
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

    const handleSave = async () => {
        const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
        setSaving(true);
        setEditing(false)
        const payload = {
            name: name?.trim() === "" ? data.name : name,
            description: description !== undefined && description !== null ? description : data.description

        };
        try {
            await axios.put(`https://auth.dnjs.lk/api/user`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSaving(true)

            // future refs - this helps render the ui with new name and description once saved
            setData((prev) => ({
                ...prev,
                name: payload.name,
                description: payload.description
            }));

        } catch (err) {
            console.error(`Error:`, err)
        } finally {
            setSaving(false)
        }
    }

    // the part that displays the current data in the editing input boxes
    useEffect(() => {
        if (data) {
            setName(data.name || "");
            setDescription(data.description || "");
        }
    }, [data]);



    return (
        <div>
            {editing ? (
                <EditPage
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription}
                    handleSave={handleSave}
                    saving={saving}
                    back={() => setEditing(false)}
                />
            ) : (
                <div>
                    <h3>You have now logged in!</h3>
                    <p>Name: {data?.name}</p>
                    <p>Email: {data?.email}</p>
                    <img
                        src={data?.avatar}
                        alt="User Avatar"
                        style={{
                            borderRadius: "50%",
                            width: "100px",
                            height: "100px",
                            objectFit: "cover"
                        }}
                    />
                    <p>Subscribed: {data?.subscribed ? "Yes" : "No"}</p>
                    <p>Description: {data?.description}</p>

                    <button
                        onClick={() => setEditing(true)}
                        style={{ margin: "10px", color: "cyan" }}

                    >
                        Edit Profile
                    </button>
                    <br />
                    <button
                        onClick={logOut}
                        disabled={loggedOut}
                        style={{ margin: "10px", color: "red" }}
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>

    )
}

function EditPage(props) {
    const { name, setName, description, setDescription, handleSave, loading, back } = props;
    return (
        <div>
            <h4>Edit Your Profile</h4>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Change Name"
            />
            <br />
            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Change Description"
                style={{ margin: "10px" }}
            />
            <br />
            <button
                onClick={handleSave}
                disabled={loading}
                style={{ margin: "10px", color: "chartreuse" }}
            >
                {loading ? "Saving..." : "Save"}
            </button>

            <button
                onClick={back}
                style={{ margin: "10px", color: "cyan" }}
            >
                Go back
            </button>
        </div>

    )
}

export default function Assignment_14() {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const token =
            localStorage.getItem("access_token") ||
            sessionStorage.getItem("access_token");

        const signedIn =
            localStorage.getItem("signedin") ||
            sessionStorage.getItem("signedin");

        if (token && signedIn === "false") {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, []);

    return logged ? <ProfileScreen setLogged={setLogged} /> : <LogScreen setLogged={setLogged} />
} 