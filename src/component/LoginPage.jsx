import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/auth/login", { username, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            localStorage.setItem("token", res.data.token);
            alert("đăng nhập thành công")
        } catch (err) {
            console.log(err)
            alert("Sai username hoặc password");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginPage;
