import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, redirectDocument } from "react-router-dom";

// LOGIN SCREEN
function LogScreen({ setLogged }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [rememberMe, setRememberMe] = useState(false);

    // Login button logic
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

// PROFILE SCREEN
function ProfileScreen({ setLogged }) {
    const [data, setData] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [pwrdChange, setpwrdChange] = useState(false);
    const [password, setPassword] = useState("");

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

    // LOGOUT BUTTON LOGIC
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

    // SAVE BUTTON LOGIC
    const handleSave = async () => {
        const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
        setSaving(true);
        setEditing(false);
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
            setName((prev) => prev || data.name || "");
            setDescription((prev) => prev || data.description || "");
        }
    }, [data]);

    return (
        <div>
            {
                editing ? (
                    <EditPage
                        name={name}
                        setName={setName}
                        description={description}
                        setDescription={setDescription}
                        handleSave={handleSave}
                        loading={saving}
                        back={() => setEditing(false)}
                        setData={setData}
                    />
                ) :
                    pwrdChange ? (
                        <ChangePwrd
                            password={password}
                            setPassword={setPassword}
                            close={() => setpwrdChange(false)}
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
                                onClick={() => setpwrdChange(true)}
                            >
                                Change Password
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


// EDIT PAGE
function EditPage(props) {
    const { name, setName, description, setDescription, handleSave, loading, back, setData } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("")

    const fileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setSuccess(false);
            setUploading(false);
            setSelectedFile(file);
            setError("")
        } else {
            setError('Select valid image file');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return setError('No image selected');

        const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("avatar", selectedFile);

        setUploading(true);
        setSuccess(false);
        try {
            await axios.post(`https://auth.dnjs.lk/api/avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "multipart/form-data"
                }
            });

            setData((prev) => ({
                ...prev,
                avatar: URL.createObjectURL(selectedFile)
            }));

            setSuccess(true);
        } catch (err) {
            console.error('Upload failed', err);
        } finally {
            setUploading(false);
        }
    };
    return (
        <div>
            <h4>Edit Your Profile</h4>
            <input
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
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
            {selectedFile && (
                <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        margin: "10px",
                    }} />
            )}
            <br />
            <input type="file"
                accept="image/"
                onChange={fileChange} />
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
                onClick={handleUpload}
                disabled={uploading || success}>
                {
                    uploading ? 'Uploading...' :
                        success ? 'Uploaded' : 'Upload'
                }
            </button>
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
                Go Back
            </button>
        </div>

    )
}


// PASSWORD CHANGE
function ChangePwrd({ close, password, setPassword }) {
    const [currentPwrd, setCurrentPwrd] = useState("")
    const [newPwrd, setNewPwrd] = useState("");
    const [changing, setChanging] = useState(false);
    const [errorPwrdChange, setErrorPwrdChange] = useState("");
    const [success, setSuccess] = useState("");
    const [reEnter, setReEnter] = useState("");

    const validity = () => {
        const currentTrim = currentPwrd.trim();
        const newTrim = newPwrd.trim();
        const reEnterTrim = reEnter.trim();

        if (!currentTrim || !newTrim || !reEnterTrim === "") {
            setErrorPwrdChange(`All fields are required`);
            return false;
        }
        if (newTrim !== reEnterTrim) {
            setErrorPwrdChange(`New password & re-entered password doesnt match`);
            return false;
        }
        if (newPwrd.length < 8) {
            setErrorPwrdChange(`must be at least 8 characters long`);
            return false;
        }
        if (newPwrd.length > 40) {
            setErrorPwrdChange(`must not exceed 40 characters`);
            return false;
        }
        if (!/[0-9]/.test(newPwrd)) {
            setErrorPwrdChange(`must contain at least one numeric character`);
            return false;
        }
        if (!/[*/@#$-]/.test(newPwrd)) {
            setErrorPwrdChange(`must contain at least one special character (*/\-@#$)`);
            return false;
        }
        if (!/[a-z]/.test(newPwrd)) {
            setErrorPwrdChange(`must contain at least one lowercase letter`);
            return false;
        }
        if (!/[A-Z]/.test(newPwrd)) {
            setErrorPwrdChange(`must contain at least one uppercase letter`);
            return false;
        }

        setErrorPwrdChange("");
        return true;
    }

    const handleChange = async (e) => {
        setSuccess("")
        const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

        setChanging(true);
        if (!validity()) {
            setChanging(false);
            return;
        }

        try {
            await axios.put(`https://auth.dnjs.lk/api/password`,
                {
                    old_password: currentPwrd,
                    new_password: newPwrd
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPassword(newPwrd);
            setNewPwrd("");
            setReEnter("")
            setCurrentPwrd("");
            setErrorPwrdChange("");
            setSuccess("Password Changed");
        } catch (err) {
            if (currentPwrd !== password) {
                setErrorPwrdChange(`Current password is incorrect`)
            } else {
                setErrorPwrdChange("Failed to update password. Try again.");
            }
            console.error(`Error in changing password:`, err)
        } finally {
            setChanging(false)
        }
    }

    return (
        <div>
            <input
                placeholder="Enter current password"
                type="password"
                value={currentPwrd}
                onChange={(e) => {
                    setCurrentPwrd(e.target.value);
                    setSuccess("");
                    setErrorPwrdChange("");
                }}
                style={{ margin: "10px" }}

            />

            <br />
            <input
                placeholder="Enter new password"
                value={newPwrd}
                type="password"
                onChange={(e) => {
                    setNewPwrd(e.target.value);
                    setSuccess("");
                    setErrorPwrdChange("");
                }}
                style={{ margin: "10px" }}
            />
            <br />
            <input
                placeholder="Re-Enter new password"
                value={reEnter}
                type="password"
                onChange={(e) => {
                    setReEnter(e.target.value)
                    setSuccess("");
                    setErrorPwrdChange("");
                }}
                style={{ margin: "10px" }} />
            <br />
            {errorPwrdChange && <p style={{ color: "red" }}>{errorPwrdChange}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            {/* update button */}
            <button
                onClick={handleChange}
                style={{ margin: "10px", color: "cyan" }}
                disabled={changing}
            >
                {changing ? "Updating..." : "Change Password"}
            </button>
            <button
                onClick={close}
                style={{ margin: "10px", color: "red" }}
            >
                Close
            </button>
        </div>
    )
}


export default function Assignment_16() {
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